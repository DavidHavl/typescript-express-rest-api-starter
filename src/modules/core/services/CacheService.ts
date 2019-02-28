/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import CacheServiceInterface from './interfaces/CacheServiceInterface'
import 'reflect-metadata';
import { injectable } from 'inversify'

@injectable()
class CacheService implements CacheServiceInterface {
  constructor () {
  }

  get (key: String): any {
  }

  set (key: String, value: any): void {
  }

  close (): void {
  }
}

export default CacheService
