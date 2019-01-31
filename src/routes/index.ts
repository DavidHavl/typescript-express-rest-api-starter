import { Router, Response, Request, NextFunction } from 'express'

import { itemRoutes } from '@/components/item/config/routes'

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  // TODO: recode to use boom?
  // setTimeout(() => {
  //   throw new Error('Oops this is caught where')
  // }, 1000)
  throw new Error('This is a normal error')

})

router.use('/item', itemRoutes)

export default router
