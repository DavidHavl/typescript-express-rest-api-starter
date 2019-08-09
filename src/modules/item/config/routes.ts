/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { Router } from 'express'
import { DIContainer, DITypes } from '@/config/di'
import RestApiControllerInterface from '@/lib/interfaces/controllers/RestApiControllerInterface'

function itemRoutes() : Router {
  const router = Router()
  const itemController = DIContainer.resolve<RestApiControllerInterface>(DITypes['Item.Controller.ItemController'])
  router.get('/items', itemController.indexAction)
  router.get('/items/:id(\d+)', itemController.getAction)
  router.post('/items', itemController.postAction)
  router.patch('/items/:id(\d+)', itemController.patchAction)
  router.delete('/items/:id(\d+)', itemController.deleteAction)
  return router
}
export { itemRoutes }
