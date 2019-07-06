/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { SchemaLike, ValidationErrorItem } from 'joi'

interface InputValidatorInterface {
  schema: SchemaLike
  setData (data: object): this
  isValid (data?: object): boolean
  getCleanData (): object | null
  getErrors (): ValidationErrorItem[] | null
}

export default InputValidatorInterface
