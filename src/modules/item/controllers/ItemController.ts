/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { Response, Request, NextFunction } from 'express'
import RestApiControllerInterface from '@/lib/interfaces/controllers/RestApiControllerInterface'
import ItemInputValidator from '@/modules/item/input-validators/ItemInputValidator'
import ValidationError from '@/lib/errors/http/ValidationError'
import NotFoundError from '@/lib/errors/http/NotFoundError'

class ItemController implements RestApiControllerInterface {
  constructor () {}

  indexAction (req: Request, res: Response, next: NextFunction) {
  }

  getAction (req: Request, res: Response, next: NextFunction) {
  }

  postAction (req: Request, res: Response, next: NextFunction) {
  }

  patchAction (req: Request, res: Response, next: NextFunction) {
  }

  deleteAction (req: Request, res: Response, next: NextFunction) {
  }
}

export default ItemController
