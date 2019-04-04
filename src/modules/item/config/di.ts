/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { interfaces } from 'inversify'
import Container = interfaces.Container

const itemDITypes = {
  // 'Item.Service.ItemService': Symbol('Item.Service.ItemService'),
}

const itemDIBinder = (container: Container) => {

}

export { itemDIBinder, itemDITypes as ItemDITypes }
