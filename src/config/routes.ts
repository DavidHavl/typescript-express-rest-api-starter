import { Router, Response, Request, NextFunction } from 'express'

import { itemRoutes } from '@/modules/item/config/routes'

const router = Router()
const version = process.env.API_VERSION || 'v1'

router.get('/', (req: Request, res: Response): void => {
  // setTimeout(() => {
  //   throw new Error('Oops this is caught where')
  // }, 1000)
  // throw new Error('This is a normal error')
  res.status(200).send('OK')
})

router.use(`/${version}`, itemRoutes)

export default router
