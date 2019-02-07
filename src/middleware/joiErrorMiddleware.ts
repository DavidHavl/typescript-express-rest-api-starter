import { NextFunction, Request, Response } from 'express'

export default function (err: any, req: Request, res: Response, next: NextFunction): void {
  // if error is Joi (input validation error)
  if (err.error.isJoi) {
    // set problem-json header
    res.header('Content-Type', 'application/problem+json; charset=utf-8')
    // set status code
    res.status(err.error.statusCode || 400) // TODO: 400 if user_id is missing and 422 if user_id is wrong (ie. -43rw43)
    // return problem-json formated response. https://tools.ietf.org/html/rfc7807
    res.json({
      status: err.error.statusCode || 400, // status code
      detail: err.error.message || 'Oops something went wrong!', // readable by users
      title: err.error.name, // readable by engineers,
      type: null, // URI pointing to webpage with that error
      instance: null, // URI pointing to this specific error instance if any exists
      data: err.error.data || {}, // custom data
    }).send()
  } else {
    // pass on to another error handler
    next(err)
  }
}
