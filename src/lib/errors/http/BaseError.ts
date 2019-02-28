export default class BaseError extends Error {
  public statusCode: number = 400
  public name: string = 'Api Error'
  public message: string = ''
  public details: any = null

  constructor (message?: any, statusCode?: number | null, details?: object) {
    super()
    if (message) {
      if (typeof message === 'string') {
        this.message = message
      } else if (!details) {
        this.details = message
      }
    }
    if (statusCode) {
      this.statusCode = statusCode
    }
    if (details) {
      this.details = details
    }
  }
}
