/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import Item from '@/modules/item/entities/Item'

interface ItemServiceInterface {
  getItems (where: object): Item[]
  getItemById (id: number): Item | null
}

export default ItemServiceInterface
