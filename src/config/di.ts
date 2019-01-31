import { Container } from 'inversify'
import { coreDIBinder, CoreDITypes } from '@/components/core/config/di'
import { itemDIBinder, ItemDITypes } from '@/components/item/config/di'

const types = {
  ...CoreDITypes,
  ...ItemDITypes,
}

const container = new Container()
coreDIBinder(container)
itemDIBinder(container)

export { container as DIContainer, types as DITypes }
