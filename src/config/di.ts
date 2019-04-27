import 'reflect-metadata'
import { Container } from 'inversify'
import LogServiceInterface from '@/lib/interfaces/services/LogServiceInterface'
import LogService from '@/lib/services/LogService'
import CacheServiceInterface from '@/lib/interfaces/services/CacheServiceInterface'
import CacheService from '@/lib/services/CacheService'
import DbServiceInterface from '@/lib/interfaces/services/DbServiceInterface'
import DbService from '@/lib/services/DbService'
// modules
import { itemDIBinder, ItemDITypes } from '@/modules/item/config/di'

// core dependencies
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

// glue all dependencies

const types = {
  ...coreDITypes,
  ...ItemDITypes,
}

const container = new Container()
coreDIBinder(container)
itemDIBinder(container)

export { container as DIContainer, types as DITypes }
