import BaseError from '@/lib/errors/http/BaseError'

describe('Base Input Validator', () => {
  const defaults = {
    statusCode: 400,
    name: 'Api Error',
    message: '',
  }
  test('instance creation', () => {
    const instance = new BaseError()
    expect(instance).toBeInstanceOf(BaseError)
    expect(instance.name).toBe(defaults.name)
    expect(instance.message).toBe(defaults.message)
    expect(instance.statusCode).toBe(defaults.statusCode)
  })
  test('constructor simple message assignment', () => {
    const val = 'I am an error'
    const instance = new BaseError(val)
    expect(instance.message).toBe(val)
  })
  test('constructor object message assignment', () => {
    const val = { foo: 'bar' }
    const instance = new BaseError(val)
    expect(instance.message).not.toBe(val)
    expect(instance.details).toBe(val)
  })
  test('constructor status code assignment', () => {
    const instance = new BaseError('I am an error', 500)
    expect(instance.statusCode).toBe(500)
  })
  test('constructor status code assignment with default message', () => {
    const instance = new BaseError(null, 500)
    expect(instance.message).toBe(defaults.message)
    expect(instance.statusCode).toBe(500)
  })
  test('constructor details assignment', () => {
    const val = { foo: 'bar' }
    const instance = new BaseError('I am an error', 500, val)
    expect(instance.message).not.toBe(val)
    expect(instance.statusCode).not.toBe(val)
    expect(instance.details).toBe(val)
  })
  test('constructor details assignment with defaults', () => {
    const val = { foo: 'bar' }
    const instance = new BaseError(null, null, val)
    expect(instance.message).toBe(defaults.message)
    expect(instance.statusCode).toBe(defaults.statusCode)
    expect(instance.details).toBe(val)
  })
})
