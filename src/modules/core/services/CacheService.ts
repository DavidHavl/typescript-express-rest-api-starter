import { Response, Request, NextFunction } from 'redis' // TODO: do redis
import CacheServiceInterface from './interfaces/CacheServiceInterface'
import 'reflect-metadata';
import { injectable } from 'inversify'

@injectable()
class CacheService implements CacheServiceInterface {
  constructor () { // TODO: DI use constructor variables to do dependency injections
  }

  get (key: String): any {
  }

  set (key: String, value: any): void {
  }

  close (): void {
  }
}

export default CacheService
