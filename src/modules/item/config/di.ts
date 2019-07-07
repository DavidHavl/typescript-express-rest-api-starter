/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { AwilixContainer, asClass } from 'awilix'
import ItemService from '@/modules/item/services/ItemService'

const diTypes = {
  'Item.Service.ItemService': Symbol('Item.Service.ItemService'),
}

const itemDIBinder = (container: AwilixContainer) => {
  // services
  container.register(diTypes['Item.Service.ItemService'], asClass(ItemService).inject((container) => {
    return [
      // array of dependencies to inject here
      // container.resolve(diTypes['Item.Repository.ItemRepository']),
    ]
  }).singleton())
}

export { itemDIBinder, diTypes as ItemDITypes }
