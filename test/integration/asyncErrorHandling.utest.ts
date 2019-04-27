import supertest from 'supertest'
import App from '../../src/app'
import { NextFunction, Request, Response } from 'express'
import BaseError from '../../src/lib/errors/http/BaseError'
import ValidationError from '../../src/lib/errors/http/ValidationError'

describe('GET /', () => {
  let app:App
  beforeAll(() => {
    app = new App()
  })
  test('return 500 on async error', async () => {
    const routeUrl = '/error/500'
    const message = 'This is a 500 error'
    app.getExpress().get(routeUrl, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await new Promise(() => {
        throw new Error(message)
      })
    })
    app.initErrorHandling()
    const response = await supertest(app.getExpress()).get(routeUrl);
    expect(response.status).toEqual(500);
    expect(response.type).toEqual('application/problem+json');
    expect(response.body.detail).toEqual(message);
  })
  // test('return 400 http code on async error', async () => {
  //   const routeUrl = '/error/400'
  //   const message = 'This is a http 400 error'
  //   app.getExpress().get(routeUrl, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     await new Promise(() => {
  //       throw new BaseError(message)
  //     })
  //   })
  //   app.initErrorHandling()
  //   const response = await supertest(app.getExpress()).get(routeUrl);
  //   expect(response.status).toEqual(400);
  //   expect(response.type).toEqual('application/problem+json');
  //   expect(response.body.detail).toEqual(message);
  // })
  //
  // test('return 400 http code on async validation error', async () => {
  //   const routeUrl = '/error/400validation'
  //   const message = 'This is a http validation 400 error'
  //   app.getExpress().get(routeUrl, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     await new Promise(() => {
  //       throw new ValidationError(message)
  //     })
  //   })
  //   app.initErrorHandling()
  //   const response = await supertest(app.getExpress()).get(routeUrl);
  //   expect(response.status).toEqual(400);
  //   expect(response.type).toEqual('application/problem+json');
  //   expect(response.body.title).toEqual(new ValidationError().name);
  //   expect(response.body.detail).toEqual(message);
  // })
})
