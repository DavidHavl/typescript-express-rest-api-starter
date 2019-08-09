/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { AwilixContainer, asClass } from 'awilix'
import ItemService from '@/modules/item/services/ItemService'
import ItemController from '@/modules/item/controllers/ItemController'

const diTypes = {
  'Item.Service.ItemService': Symbol.for('Item.Service.ItemService'),
  'Item.Controller.ItemController': Symbol.for('Item.Controller.ItemController'),
}

const itemDIBinder = async (container: AwilixContainer) => {
  // services
  container.register(diTypes['Item.Service.ItemService'], asClass(ItemService).singleton())

  // controllers
  container.register(diTypes['Item.Controller.ItemController'], asClass(ItemController).inject((container) => {
    return {
      itemService: container.resolve(diTypes['Item.Service.ItemService']),
    }
  })
    .singleton())
}

export { itemDIBinder, diTypes as ItemDITypes }
