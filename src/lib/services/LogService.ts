/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import LogServiceInterface from '@/lib/interfaces/services/LogServiceInterface'

class LogService implements LogServiceInterface {
  constructor () {

  }
  error (message: any): void {
    console.log(message)
  }
  // TODO: maybe add a hook to log and error methods that will initiate external code (bugpoint or winston,...)
}

export default LogService
