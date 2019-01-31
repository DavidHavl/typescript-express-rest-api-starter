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
}

export default LogService
