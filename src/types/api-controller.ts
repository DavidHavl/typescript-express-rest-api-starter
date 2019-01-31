import { Request, Response, NextFunction } from 'express'

declare module 'api-controller' {
  interface ApiController {
    getAction (req: Request, res: Response, next: NextFunction): void
    postAction (req: Request, res: Response, next: NextFunction): void
    patchAction (req: Request, res: Response, next: NextFunction): void
    deleteAction (req: Request, res: Response, next: NextFunction): void
  }
}
