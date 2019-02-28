/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import 'reflect-metadata';
import { injectable } from 'inversify'

@injectable()
class ItemService {
  // TODO: DI use constructor variables to do dependency injections
  constructor () {
  }
  getItems (where: object): object[] | [] {
    return []
  }
  getItemById (id: number): object | null {
    return {}
  }
}
