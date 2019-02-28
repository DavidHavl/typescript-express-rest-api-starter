/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import 'reflect-metadata'
import { interfaces } from 'inversify'
import Container = interfaces.Container
import LogServiceInterface from '@/modules/core/services/interfaces/LogServiceInterface'
import LogService from '@/modules/core/services/LogService'
import CacheServiceInterface from '@/modules/core/services/interfaces/CacheServiceInterface'
import CacheService from '@/modules/core/services/CacheService'
import DbServiceInterface from '@/modules/core/services/interfaces/DbServiceInterface'
import DbService from '@/modules/core/services/DbService'

const coreDITypes = {
  LogService: Symbol.for('LogService'),
  CacheService: Symbol.for('CacheService'),
  DbService: Symbol.for('DbService'),
}

const coreDIBinder = (container: Container) => {
  container.bind<LogServiceInterface>(coreDITypes.LogService).to(LogService).inSingletonScope()
  container.bind<CacheServiceInterface>(coreDITypes.CacheService).to(CacheService).inSingletonScope()
  container.bind<DbServiceInterface>(coreDITypes.DbService).to(DbService).inSingletonScope()
}

export { coreDIBinder, coreDITypes as CoreDITypes }
