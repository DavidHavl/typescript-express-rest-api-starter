/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { Response, Request, NextFunction } from 'express'
import RestApiControllerInterface from '@/modules/core/controllers/interfaces/RestApiControllerInterface'
import ItemInputValidator from '@/modules/item/input-validators/ItemInputValidator'
import ValidationError from '@/lib/errors/http/ValidationError'
import NotFoundError from '@/lib/errors/http/NotFoundError'

export default class ItemController implements RestApiControllerInterface {
  constructor () {}

  indexAction (req: Request, res: Response, next: NextFunction) {
    // const items = Item.findAll()
    // const itemData: object[] = []
    // items.forEach((item: ModelInterface) => {
    //   itemData.push(item.toExternalObject())
    // })
    // res.status(200).send(itemData)
  }

  getAction (req: Request, res: Response, next: NextFunction) {
    // const id = req.params.id
    // const item = Item.findById(id)
    // if (!item || !item.id) {
    //   return Boom.wrongItem
    // }
    // res.status(200).send(item.toExternalObject())
  }

  async postAction (req: Request, res: Response, next: NextFunction) {
    // const validator = new ItemInputValidator(req.body)
    // if (!validator.isValid()) {
    //   return new ValidationError(validator.getErrors())
    // }
    // const item = new Item(validator.getCleanData());
    // await item.save()
    // res.status(200).send(item.toExternalObject())
  }

  patchAction (req: Request, res: Response, next: NextFunction) {
    // const id = req.params.id
    // const item = Item.findById(id)
    // if (!item) {
    //   return new NotFoundError()
    // }
    // const validator = new ItemInputValidator(req.body)
    // if (!validator.isValid()) {
    //   return new ValidationError(validator.getErrors())
    // }
    // const validData = validator.getCleanData()
    // item.populate(validData)
    // item.save()
    res.status(200).send('OK')
  }

  deleteAction (req: Request, res: Response, next: NextFunction) {
    res.status(200).send('OK')
  }
}
