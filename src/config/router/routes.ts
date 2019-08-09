import { Router, Response, Request, NextFunction } from 'express'

import { itemRoutes } from '@/modules/item/config/routes'

function routes(): Router {
  const router = Router()
  const version = process.env.API_VERSION || 'v1'

  router.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ data: 'OK' })
  })

  router.use(`/${version}`, itemRoutes())
  return router
}

export default routes
