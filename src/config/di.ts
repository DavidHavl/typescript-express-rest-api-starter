import { Container } from 'inversify'
import { coreDIBinder, CoreDITypes } from '@/modules/core/config/di'
import { itemDIBinder, ItemDITypes } from '@/modules/item/config/di'

const types = {
  ...CoreDITypes,
  ...ItemDITypes,
}

const container = new Container()
coreDIBinder(container)
itemDIBinder(container)

export { container as DIContainer, types as DITypes }
