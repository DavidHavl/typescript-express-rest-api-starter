import BaseError from './BaseError'

export default class UnauthorizedError extends BaseError {
  public statusCode = 401
  public name = 'UnauthorizedError'
  public message = 'You are not authenticated.  Please authenticate and try again.'
}
