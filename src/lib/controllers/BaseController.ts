/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { Response, Request, NextFunction } from 'express'
import RestApiControllerInterface from '@/lib/interfaces/controllers/RestApiControllerInterface'

class BaseController implements RestApiControllerInterface {
  constructor () {

  }

  indexAction (req: Request, res: Response, next: NextFunction) {
    res.status(501).send('Not Implemented')
  }
  getAction (req: Request, res: Response, next: NextFunction) {
    res.status(501).send('Not Implemented')
  }

  postAction (req: Request, res: Response, next: NextFunction) {
    res.status(501).send('Not Implemented')
  }

  patchAction (req: Request, res: Response, next: NextFunction) {
    res.status(501).send('Not Implemented')
  }

  deleteAction (req: Request, res: Response, next: NextFunction) {
    res.status(501).send('Not Implemented')
  }
}

export default BaseController
