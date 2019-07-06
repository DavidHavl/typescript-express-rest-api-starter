import BaseError from './BaseError'

class NotAuthenticatedError extends BaseError {
  public statusCode = 401
  public name = 'NotAuthenticatedError' // UnauthorizedError
  public message = 'You are not authenticated.  Please authenticate and try again.'
}

export default NotAuthenticatedError
