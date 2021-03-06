/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import InputValidatorInterface from '@/lib/interfaces/input-validators/InputValidatorInterface'

import joi, { SchemaLike, ValidationError as JoiValidationError, ValidationErrorItem } from 'joi'
import ObjectLiteral from 'ObjectLiteral'

class BaseInputValidator implements InputValidatorInterface {
  private stripUnknownFields: boolean = true
  private data: ObjectLiteral | null = null
  private cleanData: ObjectLiteral = {}
  private errorObject: JoiValidationError | null = null
  public schema: SchemaLike = joi.object().keys({})

  constructor (data?: object) {
    if (data) {
      this.setData(data)
    }
  }

  setData (data: object): this {
    this.data = data
    return this
  }

  isValid (data?: object): boolean {
    if (data) {
      this.setData(data)
    }
    const result = joi.validate(this.data, this.schema, { allowUnknown: true, stripUnknown: this.stripUnknownFields })
    if (result.error === null) {
      this.cleanData = result.value === null ? {} : result.value
      this.errorObject = null
    } else {
      this.cleanData = {}
      this.errorObject = result.error
    }
    return this.errorObject === null
  }

  getCleanData (): object {
    return this.cleanData
  }

  getErrors (): ValidationErrorItem[] | null {
    return this.errorObject ? this.errorObject.details : null
  }
}

export default BaseInputValidator
