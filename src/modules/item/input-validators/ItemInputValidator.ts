/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import BaseInputValidator from '@/modules/core/input-validators/BaseInputValidator'
import joi from 'joi'

export default class ItemInputValidator extends BaseInputValidator {
  public schema = joi.object().keys({
    id: joi.number().required(),
  })
}
