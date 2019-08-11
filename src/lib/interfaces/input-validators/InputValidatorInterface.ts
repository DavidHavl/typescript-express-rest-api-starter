/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { SchemaLike, ValidationErrorItem } from 'joi'
import ObjectLiteral from 'ObjectLiteral'

interface InputValidatorInterface {
  schema: SchemaLike
  setData (data: ObjectLiteral): this
  isValid (data?: ObjectLiteral): boolean
  getCleanData (): ObjectLiteral | null
  getErrors (): ValidationErrorItem[] | null
}

export default InputValidatorInterface
