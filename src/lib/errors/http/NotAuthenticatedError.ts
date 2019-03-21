import BaseError from './BaseError'

export default class NotAuthenticatedError extends BaseError {
  public statusCode = 401
  public name = 'NotAuthenticatedError' // UnauthorizedError
  public message = 'You are not authenticated.  Please authenticate and try again.'
}
