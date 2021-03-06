/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import BaseInputValidator from '@/lib/input-validators/BaseInputValidator'
import joi from 'joi'

class ItemInputValidator extends BaseInputValidator {
  public schema = joi.object().keys({
    id: joi.number().required(),
  })
}

export default ItemInputValidator
