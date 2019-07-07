/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import App from './app'
import { Server } from 'http'

const PORT = process.env.PORT || 3000

const app = new App()
let server: Server

// do async setup and start listening
app.setup().then(() => {
  server = app.getExpress().listen(+PORT, (err: Error) => {
    if (err) {
      app.getLogger().error(err)
      return
    }
    return console.log(`server is listening on port ${+PORT}`)
  })
})

// for unhandled rejections
process.on('unhandledRejection', (ex, promise) => {
  throw ex // just throw it so uncaughtException handler catches it.
})

// for errors thrown outside of express route lifecycle
process.on('uncaughtException', (err) => {
  app.getLogger().error(err)
  process.exit(1)
})

// other process events
process.on('exit', () => {
  server.close()
  app.cleanup()
})
process.on('SIGINT', () => {
  process.exit(1)
})
process.on('SIGTERM', () => {
  process.exit(1)
})
