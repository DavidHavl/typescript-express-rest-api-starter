import request from 'supertest'
import app from '../../src/app'

describe('GET /', () => {
  test('return 200 OK', () => {
    return request(app).get('/').expect(200)
  })
})
