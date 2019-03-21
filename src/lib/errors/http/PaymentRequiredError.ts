import BaseError from './BaseError'

export default class PaymentRequiredError extends BaseError {
  public statusCode = 402
  public name = 'PaymentRequiredError'
  public message = 'The action you are trying to perform requires payment'
}
