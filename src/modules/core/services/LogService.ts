import LogServiceInterface from './interfaces/LogServiceInterface'
import 'reflect-metadata';
import { injectable } from 'inversify'

@injectable()
class LogService implements LogServiceInterface {
  constructor () {

  }
  error (message: any): void {
    console.log(message)
  }
  // TODO: maybe add a hook to log and error methods that will initiate external code (bugpoint or winston,...)
}

export default LogService
