/* tslint:disable:semicolon */
import express, { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import compression from 'compression'  // compresses requests
import 'express-async-errors'
import joiErrorMiddleware from './middleware/joiErrorMiddleware'
import prettyError from 'pretty-error'
import helmet from 'helmet'
import morgan from 'morgan'
import { DIContainer, DITypes } from '@/config/di'
import LogServiceInterface from '@/modules/core/services/interfaces/LogServiceInterface'
import DbServiceInterface from '@/modules/core/services/interfaces/DbServiceInterface'
import CacheServiceInterface from '@/modules/core/services/interfaces/CacheServiceInterface'

// custom
import routes from '@/config/routes'

class App {
  public express: express.Express
  private logger: LogServiceInterface
  private db: DbServiceInterface
  private cache: CacheServiceInterface

  constructor () {
    // Load environment variables from .env file, where API keys and passwords are configured
    config({ path: '.env' })
    // set express
    this.express = express()
    // security headers
    this.express.use(helmet())
    // parsing request
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    // compression
    this.express.use(compression())
    // let node server files in static folder
    // initStaticFiles()
    //
    this.initCors()
    // routes
    this.initRoutes()
    // logging
    this.logger = DIContainer.get<LogServiceInterface>(DITypes.LogService)
    this.db = DIContainer.get<DbServiceInterface>(DITypes.DbService)
    this.cache = DIContainer.get<CacheServiceInterface>(DITypes.CacheService)
    this.initRequestLogging()

    // errors
    this.initErrorHandler()
  }

  private initRoutes (): void {
    this.express.use('/', routes)
  }

  private initStaticFiles (): void {
    this.express.use(express.static('static'))
  }

  private initCors (): void {
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

  private initRequestLogging(): void {
    if (this.express.get('env') === 'development') {
      this.express.use(morgan('dev'))
    }
  }

  private initErrorHandler(): void {
    const pe = new prettyError()
    pe.skipNodeFiles()
    pe.skipPackage('express')
    pe.skipPackage('express-async-errors')

    // errors returned by Joi input validators.
    this.express.use(joiErrorMiddleware)
    // intercepting async errors and sending them to next(err) so it turns up here
    // is done via express-async-errors module automatically
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
      // return problem-json formated response. https://tools.ietf.org/html/rfc7807
      res.json({
        status: err.statusCode || 500, // status code
        detail: err.message || 'Oops something went wrong!', // readable by users
        title: err.name, // readable by engineers,
        type: null, // URI pointing to webpage with that error
        instance: null, // URI pointing to this specific error instance if any exists
        data: err.data || {}, // custom data
      }).send()
    })
  }

  public getLogger() {
    return this.logger
  }

  public cleanup (): void {
    const actions: Function[] = [
      this.db.close,
      this.cache.close,
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
export default new App()
