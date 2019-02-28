import nodeMocksHttp from 'node-mocks-http'
import sinon from 'sinon'
import httpErrorHandler from '@/lib/middleware/httpErrorHandler'
import BaseError from '@/lib/errors/http/BaseError'
import ValidationError from '@/lib/errors/http/ValidationError'
import joi from 'joi'

describe('httpErrorHandler middleware', () => {
  test('should return a function()', () => {
    expect(httpErrorHandler).toBeInstanceOf(Function)
  })
  test('calls next method on no error', () => {
    const req = nodeMocksHttp.createRequest({
      // method: 'GET',
      // url: '/',
      // query: {
      //   foo: 'bar',
      // },
    })
    const res = nodeMocksHttp.createResponse()
    const next = sinon.fake()
    httpErrorHandler(null, req, res, next)
    expect(next.called).toBe(true)
    expect(res.statusCode).toEqual(200)
  })

  test('sends json default error response on base error with empty instructions', () => {
    const err = new BaseError()
    err.statusCode = 0
    err.name = ''
    err.message = ''
    const req = nodeMocksHttp.createRequest()
    const res = nodeMocksHttp.createResponse()
    const next = sinon.fake() // fake function
    const expectedResult = {
      status: 400,
      title: 'Error',
      detail: 'Oops something went wrong!',
      data: null,
    }
    httpErrorHandler(err, req, res, next)
    expect(next.called).toBe(false)
    expect(res.statusCode).toEqual(400)
    expect(res.getHeader('content-type')).toEqual('application/problem+json; charset=utf-8')
    expect(res._getData()).toEqual(expectedResult)
  })

  test('sends json error response on base error passed as param', () => {
    const errorMessage = 'this is error'
    const errorStatusCode = 402
    const err = new BaseError(errorMessage, errorStatusCode, { foo: 'bar' })
    const req = nodeMocksHttp.createRequest()
    const res = nodeMocksHttp.createResponse()
    const next = sinon.fake() // fake function
    const expectedResult = {
      status: errorStatusCode,
      title: err.name,
      detail: err.message,
      data: { foo: 'bar' },
    }
    httpErrorHandler(err, req, res, next)
    expect(next.called).toBe(false)
    expect(res.statusCode).toEqual(errorStatusCode)
    expect(res.getHeader('content-type')).toEqual('application/problem+json; charset=utf-8')
    expect(res._getData()).toEqual(expectedResult)
  })

  test('sends json error response on validation error passed as param', () => {
    const errorMessage = 'this is validation error'
    const errorStatusCode = 422
    const err = new ValidationError(errorMessage, errorStatusCode, { foo: 'bar' })
    const req = nodeMocksHttp.createRequest()
    const res = nodeMocksHttp.createResponse()
    const next = sinon.fake() // fake function
    const expectedResult = {
      status: errorStatusCode,
      title: err.name,
      detail: err.message,
      data: { foo: 'bar' },
    }
    httpErrorHandler(err, req, res, next)
    expect(next.called).toBe(false)
    expect(res.statusCode).toEqual(errorStatusCode)
    expect(res.getHeader('content-type')).toEqual('application/problem+json; charset=utf-8')
    expect(res._getData()).toEqual(expectedResult)
  })

  test('sends json error response on validation error (with Joi validation details) passed as param', () => {
    const validator = joi.validate({ id: 'text' }, joi.object().keys({ id: joi.number().required() }))
    const err = new ValidationError(validator.error.details)
    const req = nodeMocksHttp.createRequest()
    const res = nodeMocksHttp.createResponse()
    const next = sinon.fake() // fake function
    const expectedResult = {
      status: err.statusCode,
      title: err.name,
      detail: err.message,
      data: null,
      validation: [{ id: 'number.base' }],
    }
    httpErrorHandler(err, req, res, next)
    expect(next.called).toBe(false)
    expect(res.statusCode).toEqual(err.statusCode)
    expect(res.getHeader('content-type')).toEqual('application/problem+json; charset=utf-8')
    expect(res._getData()).toEqual(expectedResult)
  })

  test('sends json error response on validation error (with simple validation details) passed as param', () => {
    const err = new ValidationError([{ id: 'number' }])
    const req = nodeMocksHttp.createRequest()
    const res = nodeMocksHttp.createResponse()
    const next = sinon.fake() // fake function
    const expectedResult = {
      status: err.statusCode,
      title: err.name,
      detail: err.message,
      data: null,
      validation: [{ id: 'number' }],
    }
    httpErrorHandler(err, req, res, next)
    expect(next.called).toBe(false)
    expect(res.statusCode).toEqual(err.statusCode)
    expect(res.getHeader('content-type')).toEqual('application/problem+json; charset=utf-8')
    expect(res._getData()).toEqual(expectedResult)
  })
})
