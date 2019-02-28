/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import DbServiceInterface from './interfaces/DbServiceInterface'
import 'reflect-metadata';
import { injectable } from 'inversify'

@injectable()
class DbService implements DbServiceInterface {
  constructor () { // use constructor variables to do dependency injections
  }

  close (): void {
  }
}

export default DbService
