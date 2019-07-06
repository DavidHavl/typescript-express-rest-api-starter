import BaseError from './BaseError'

class InternalServerError extends BaseError {
  public statusCode = 403
  public name = 'InternalServerError'
  public message = 'The server has encountered an error.'
}

export default InternalServerError
