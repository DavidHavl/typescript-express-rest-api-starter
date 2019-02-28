/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { Router } from 'express'
import ItemController from '@/modules/item/controllers/ItemController'

const itemRoutes = Router()
const itemController = new ItemController()
itemRoutes.get('/items', itemController.indexAction)
itemRoutes.get('/items/:id(\d+)', itemController.getAction)
itemRoutes.post('/items', itemController.postAction)
itemRoutes.patch('/items/:id(\d+)', itemController.patchAction)
itemRoutes.delete('/items/:id(\d+)', itemController.deleteAction)

export { itemRoutes }
