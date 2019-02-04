import app from './app'

const PORT = process.env.PORT || 3000

const server = app.express.listen(+PORT, (err: Error) => {
  if (err) {
    app.getLogger().error(err)
    return
  }

  return console.log(`server is listening on port ${PORT}`)
})

function closeAndExit(options: { exit?: boolean, cleanup?: boolean}, err: Error | {} | undefined): void {
  // cleanup and exit
  if (options.cleanup) {
    server.close()
    app.cleanup()
  }
  // log error
  if (err) {
    app.getLogger().error(err)
  }
  // exit
  if (options.exit) {
    process.exit()
  }
}

// for unhandled rejections
process.on('unhandledRejection', (ex, promise) => {
  throw ex // just throw it so uncaughtException handler catches it.
})

// for errors thrown outside of express route lifecycle
process.on('uncaughtException', closeAndExit.bind(null, { exit: true }))

// other process events
process.on('exit', closeAndExit.bind(null, { cleanup: true }))
process.on('SIGINT', closeAndExit.bind(null, { exit: true }))
process.on('SIGTERM', closeAndExit.bind(null, { exit: true }))
