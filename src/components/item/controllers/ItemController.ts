import { Response, Request, NextFunction } from 'express'

export default class ItemController {
  constructor () {

  }

  getAction (req: Request, res: Response, next: NextFunction): void {
    res.status(200).send('OK')  // TODO: 400 if item_id is missing and 422 if item_id is wrong (-43rw43)
  }

  postAction (req: Request, res: Response, next: NextFunction): void {
    res.status(200).send('OK')
  }

  patchAction (req: Request, res: Response, next: NextFunction): void {
    res.status(200).send('OK')
  }

  deleteAction (req: Request, res: Response, next: NextFunction): void {
    res.status(200).send('OK')
  }
}
