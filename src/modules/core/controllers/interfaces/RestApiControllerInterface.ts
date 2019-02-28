/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
import { Response, Request, NextFunction } from 'express'

export default interface RestApiControllerInterface {
  indexAction (req: Request, res: Response, next: NextFunction): void  // get list of all items by filter.

  getAction (req: Request, res: Response, next: NextFunction): void    // get item by id

  postAction (req: Request, res: Response, next: NextFunction): void   // create new item

  patchAction (req: Request, res: Response, next: NextFunction): void  // update item by id

  deleteAction (req: Request, res: Response, next: NextFunction): void // delete item by id
}
