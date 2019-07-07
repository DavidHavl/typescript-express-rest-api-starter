import { createContainer, AwilixContainer, asClass } from 'awilix'
import LogService from '@/lib/services/LogService'
import CacheService from '@/lib/services/CacheService'
import DbService from '@/lib/services/DbService'
// modules
import { itemDIBinder, ItemDITypes } from '@/modules/item/config/di'

// core dependencies
const coreDITypes = {
  LogService: Symbol.for('LogService'),
  CacheService: Symbol.for('CacheService'),
  DbService: Symbol.for('DbService'),
}

// glue all dependencies

const types = {
  ...coreDITypes,
  ...ItemDITypes,
}

const container = createContainer({
  injectionMode: 'CLASSIC',
})

const binder = async (container: AwilixContainer) => {
  // CORE
  container.register(coreDITypes.LogService, asClass(LogService).singleton())
  container.register(coreDITypes.CacheService, asClass(CacheService).singleton())
  container.register(coreDITypes.DbService, asClass(DbService).singleton())

  // MODULES //
  // this should be sorted by dependency hierarchy (so that dependency is bound before it's used in the next code)
  await itemDIBinder(container)
}

export { container as DIContainer, types as DITypes, binder as DIBinder }

