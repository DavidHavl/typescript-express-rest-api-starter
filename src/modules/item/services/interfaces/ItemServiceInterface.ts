/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import Item from '@/modules/item/entities/Item'

export default interface ItemServiceInterface {
  getItems (where: object): Item[]
  getItemById (id: number): Item | null
}
