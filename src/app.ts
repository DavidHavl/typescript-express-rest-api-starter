/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
/* tslint:disable:semicolon */
import express, { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import compression from 'compression'  // compresses requests
import 'express-async-errors'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import helmet from 'helmet'
import morgan from 'morgan'
import { DIContainer, DITypes, DIBinder } from '@/config/di'
import LogServiceInterface from '@/lib/interfaces/services/LogServiceInterface'
import DbServiceInterface from '@/lib/interfaces/services/DbServiceInterface'
import CacheServiceInterface from '@/lib/interfaces/services/CacheServiceInterface'
import halContentType from '@/lib/middleware/halContentType'
import NotFoundError from '@/lib/errors/http/NotFoundError'
import httpErrorHandler from '@/lib/middleware/httpErrorHandler'
import PrettyError from 'pretty-error'

// custom
import routes from '@/config/router/routes'

class App {
  public express: express.Application

  constructor() {
    // Load environment variables from .env file, where API keys and passwords are configured
    config({ path: '.env' })
    // set express
    this.express = express()
    // security headers
    this.express.use(helmet())
    // rate limiter
    this.initRateLimiter()
    // parsing request
    this.express.use(bodyParser.json({ limit: '100kb' }))
    this.express.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }))
    // compression
    this.express.use(compression())
    // set HAL response content type
    this.express.use(halContentType)
    // init CORS
    this.initCors()
    // logging
    this.initRequestLogging()
    // routes
    this.initRoutes()
    // errors
    this.initErrorHandling()
  }

  /**
   * setup the app and perform async operations so everything is ready for the server to start listening
   */
  /**
   * setup the app and perform async operations so everything is ready for the server to start listening
   */
  public async setup () {
    // setup DI (which is async)
    await DIBinder(DIContainer)
    // now that DI is setup and populated, init routes and other things that depend on it
    this.express.use('/', routes())
    // 404 route
    this.express.use((req, res, next) => {
      throw new NotFoundError() // 404
    })
    // init error handling after all routes hhave been defined
    this.initErrorHandling()
  }

  getDatabase (): DbServiceInterface {
    return DIContainer.resolve<DbServiceInterface>(DITypes.DbService)
  }

  getCache (): CacheServiceInterface {
    return DIContainer.resolve<CacheServiceInterface>(DITypes.CacheService)
  }

  private initRoutes(): void {
    this.express.use('/', routes)
  }

  private initCors(): void {
    // set CORS headers
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN)
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      res.header('Access-Control-Max-Age', '60') // cache pre-flight response for 60 seconds
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
        return res.status(200).json({})
      }
      next()
    })
  }

  private initRateLimiter () {
    const rateLimiter = new RateLimiterMemory({
      points: 20, // 20 tries
      duration: 1, // Per 1 second
    })
    this.express.use((req, res, next) => {
      rateLimiter.consume(req.ip)
        .then(() => {
          next()
        })
        .catch(() => {
          res.status(429).send('Too Many Requests')
          // Boom.tooManyRequests('Rate limit exceeded')
        })
    })
    // only apply to requests that begin with /api/
    // this.express.use("/api/", () => {...})
  }

  private initRequestLogging(): void {
    if (this.express.get('env') === 'development') {
      this.express.use(morgan('dev'))
    }
  }

  public initErrorHandling(): void {
    const pe = new PrettyError()
    pe.skipNodeFiles()
    pe.skipPackage('express')
    pe.skipPackage('express-async-errors')

    // errors returned as validation or that should be send back to user.
    this.express.use(httpErrorHandler)
    // intercepting async errors and sending them to next(err) so it turns up here is done via express-async-errors
    this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
      // log
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.error(pe.render(err))
      }
      // log it permanently
      this.getLogger().error(err)

      // set problem-json header
      res.header('Content-Type', 'application/problem+json; charset=utf-8')
      // set status code
      res.status(err.statusCode || 500)
      // return problem-json formatted response. https://tools.ietf.org/html/rfc7807
      res.send({
        status: err.statusCode || 500, // status code
        detail: err.message || 'Oops something went wrong!', // readable by users
        title: err.name || 'Error', // readable by engineers,
        data: err.data || {}, // custom data
      })
      // TODO: this is probably 500 error so should we restart the server?
    })
  }

  public getLogger(): LogServiceInterface {
    return DIContainer.resolve<LogServiceInterface>(DITypes.LogService)
  }

  public getExpress() {
    return this.express
  }

  public cleanup(): void {
    const actions: Function[] = [
      this.getDatabase().close,
      this.getCache().close,
    ]
    actions.forEach((action, i) => {
      try {
        action(() => {
          if (i === actions.length - 1) {
            process.exit()
          }
        })
      } catch (err) {
        if (i === actions.length - 1) {
          process.exit()
        }
      }
    })
  }
}
export default App
