import supertest from 'supertest'
import App from '../../src/app'
import BaseError from '../../src/lib/errors/http/BaseError'
import ValidationError from '../../src/lib/errors/http/ValidationError'

describe('GET /', () => {
  let app:App
  const routeConfig = {
    500: {
      url: '/error/500',
      message: 'This is a 500 error',
    },
    400: {
      url: '/error/400',
      message: 'This is a http 400 error',
    },
    '400v': {
      url: '/error/400validation',
      message: 'This is a http validation 400 error',
    },
  }
  beforeAll(async () => {
    app = new App()

    app.getExpress().get(routeConfig[500].url, (): Promise<void> => {
      throw new Error(routeConfig[500].message)
    })

    app.getExpress().get(routeConfig[400].url, (): Promise<void> => {
      throw new BaseError(routeConfig[400].message)
    })

    app.getExpress().get(routeConfig['400v'].url, (): Promise<void> => {
      throw new ValidationError(routeConfig['400v'].message)
    })
    await app.setup()
  })
  test('return 500 on sync error', async () => {
    const response = await supertest(app.getExpress()).get(routeConfig[500].url);
    expect(response.status).toEqual(500);
    expect(response.type).toEqual('application/problem+json');
    expect(response.body.detail).toEqual(routeConfig[500].message);
  })
  test('return 400 http code on sync error', async () => {
    const response = await supertest(app.getExpress()).get(routeConfig[400].url);
    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/problem+json');
    expect(response.body.detail).toEqual(routeConfig[400].message);
  })

  test('return 400 http code on sync validation error', async () => {
    const response = await supertest(app.getExpress()).get(routeConfig['400v'].url);
    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/problem+json');
    expect(response.body.title).toEqual(new ValidationError().name);
    expect(response.body.detail).toEqual(routeConfig['400v'].message);
  })
})
