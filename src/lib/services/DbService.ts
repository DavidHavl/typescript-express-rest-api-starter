/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import DbServiceInterface from '@/lib/interfaces/services/DbServiceInterface'
import config from 'config'

class DbService implements DbServiceInterface {
  constructor () { // use constructor variables to do dependency injections
    const dbConfig = config.get('db')
  }

  close (): void {
  }
}

export default DbService
