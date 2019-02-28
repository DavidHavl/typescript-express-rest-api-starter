import { NextFunction, Request, Response } from 'express'
import PlainObject from 'PlainObject'
import BaseError from '@/lib/errors/http/BaseError'
import ValidationError from '@/lib/errors/http/ValidationError'
import isPlainObject from 'is-plain-object'
import isPlainObjectArray from '@/lib/utils/isPlainObjectArray'

export default function (err: any, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof BaseError) {
    // set problem-json header
    res.header('Content-Type', 'application/problem+json; charset=utf-8')
    // set status code
    res.status(err.statusCode || 400)
    // return problem-json formated response. https://tools.ietf.org/html/rfc7807
    const error: PlainObject = {
      status: err.statusCode || 400, // status code
      title: err.name || 'Error', // short, readable by engineers,
      detail: err.message || 'Oops something went wrong!', // A human-readable description of the specific error.
      // type: null, // URI pointing to webpage with that error
      // instance: null, // URI pointing to this specific error instance (an error log record)
      data: err.details ? err.details : null, // extra data to send with the response
    }
    // if error is Joi (input validation error)
    if (err instanceof ValidationError) {
      if (err.validation && isPlainObjectArray(err.validation)) {
        Object.defineProperty(error, 'validation', { value: [], enumerable: true })
        err.validation.forEach((item) => {
          if (isPlainObject(item)) {
            if (item.path && Array.isArray(item.path) && item.type) {
              const obj: object = {
                [item.path.join('.')] : item.type,
              }
              error.validation.push(obj)
            } else {
              error.validation.push(item)
            }
          }
        })
      }
    }
    // send
    res.send(error)
  } else {
    // pass on to another error handler
    next(err)
  }
}
