import { Router } from 'express'
import ItemController from '@/modules/item/controllers/ItemController'

const itemRoutes = Router()
const itemController = new ItemController()

itemRoutes.get('/', itemController.getAction)
itemRoutes.post('/', itemController.postAction)
itemRoutes.patch('/', itemController.patchAction)
itemRoutes.delete('/', itemController.deleteAction)

export { itemRoutes }
