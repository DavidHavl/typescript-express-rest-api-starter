import supertest from 'supertest'
import App from '../../src/app'

describe('GET /', () => {
  let app:App
  beforeAll(async () => {
    app = new App()
    debugger
    await app.setup()
    debugger
  })

  test('return 200 OK', () => {
    debugger
    return supertest(app.getExpress()).get('/').expect(200)
    // or JEST way
    // const response = await supertest(app.express).get('/');
    // expect(response.status).toEqual(200);
    // expect(response.type).toEqual('application/json');
    // expect(response.body.data).toEqual('Sending some JSON');
  })
})
