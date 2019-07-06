import BaseError from './BaseError'

class ForbiddenError extends BaseError {
  public statusCode = 403
  public name = 'ForbiddenError'
  public message = 'You are not allowed to access the requested item.'
}

export default ForbiddenError
