/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { SchemaLike, ValidationErrorItem } from 'joi'

export default interface InputValidatorInterface {
  schema: SchemaLike
  setData (data: object): this
  isValid (data?: object): boolean
  getCleanData (): object | null
  getErrors (): ValidationErrorItem[] | null
}
