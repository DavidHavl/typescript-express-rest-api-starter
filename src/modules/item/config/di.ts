/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { interfaces } from 'inversify'
import Container = interfaces.Container
import ItemServiceInterface from '@/modules/item/services/interfaces/ItemServiceInterface'
import ItemService from '@/modules/item/services/ItemService'

const itemDITypes = {
  'Item.Service.ItemService': Symbol('Item.Service.ItemService'),
}

const itemDIBinder = (container: Container) => {
  container.bind<ItemServiceInterface>(itemDITypes['Item.Service.ItemService']).to(ItemService).inSingletonScope()
}

export { itemDIBinder, itemDITypes as ItemDITypes }
