import 'reflect-metadata'
import { interfaces } from 'inversify'
import Container = interfaces.Container
import LogServiceInterface from '@/components/core/services/interfaces/LogServiceInterface'
import LogService from '@/components/core/services/LogService'
import CacheServiceInterface from '@/components/core/services/interfaces/CacheServiceInterface'
import CacheService from '@/components/core/services/CacheService'

const coreDITypes = {
  LogService: Symbol.for('LogService'),
  CacheService: Symbol.for('CacheService'),
}

const coreDIBinder = (container: Container) => {
  container.bind<LogServiceInterface>(coreDITypes.LogService).to(LogService).inSingletonScope()
  container.bind<CacheServiceInterface>(coreDITypes.CacheService).to(CacheService).inSingletonScope()
}

export { coreDIBinder, coreDITypes as CoreDITypes }
