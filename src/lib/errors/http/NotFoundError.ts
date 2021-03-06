import BaseError from './BaseError'

class NotFoundError extends BaseError {
  public statusCode = 404
  public name = 'NotFoundError'
  public message = 'The requested item was not found'
}

export default NotFoundError
