import BaseError from './BaseError'

export default class BadRequestError extends BaseError {
  public statusCode = 400
  public name = 'BadRequestError'
  public message = 'There is a problem with the submitted request'
}
