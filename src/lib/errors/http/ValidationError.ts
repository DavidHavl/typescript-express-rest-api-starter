import { ValidationErrorItem } from 'joi'
import BaseError from './BaseError'
import isObjectLiteralArray from '@/lib/utils/isObjectLiteralArray'
import ObjectLiteralArray from 'ObjectLiteralArray'

export default class ValidationError extends BaseError {
  public statusCode: number = 400
  public name: string = 'ValidationError'
  public message: string = 'The request data is not valid'
  public details: any = null
  public validation: ValidationErrorItem[] | ObjectLiteralArray | null = null
  constructor (message?: string | ValidationErrorItem[] | ObjectLiteralArray | null,
               statusCode?: number | null,
               details?: object) {
    super()
    if (message) {
      if (typeof message === 'string') {
        this.message = message
      } else if (isObjectLiteralArray(message)) {
        this.validation = message
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
