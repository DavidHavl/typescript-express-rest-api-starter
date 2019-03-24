/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import App from './app'

const PORT = process.env.PORT || 3000

const app = new App()
app.start(+PORT)

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
  app.stop()
})
process.on('SIGINT', () => {
  process.exit(1)
})
process.on('SIGTERM', () => {
  process.exit(1)
})
