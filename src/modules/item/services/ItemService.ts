/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import 'reflect-metadata';
import { injectable } from 'inversify'
import Item from '@/modules/item/entities/Item'
import ItemServiceInterface from '@/modules/item/services/interfaces/ItemServiceInterface'

@injectable()
export default class ItemService implements ItemServiceInterface{
  constructor () {
  }
  getItems (where: object): Item[] | [] {
    return [new Item({}), new Item({})]
  }
  getItemById (id: number): Item | null {
    return new Item({})
  }
}
