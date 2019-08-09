import supertest from 'supertest'
import App from '../../src/app'
import NotFoundError from '@/lib/errors/http/NotFoundError'

describe('GET /', () => {
  let app:App
  beforeAll(async () => {
    app = new App()
    await app.setup()
  })

  test('return 200 OK', async () => {
    const response = await supertest(app.getExpress()).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/hal+json');
    expect(response.body.data).toEqual('OK');
  })

  test('return 404 on wrong url', async () => {
    const response = await supertest(app.getExpress()).get('/ihufhajdf');
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/problem+json');
    expect(response.body.title).toEqual('NotFoundError');
  })
})
