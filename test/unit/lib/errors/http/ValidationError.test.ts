import ValidationError from '@/lib/errors/http/ValidationError'
import ObjectLiteralArray from 'ObjectLiteralArray'

describe('Base Input Validator', () => {
  const defaults = {
    statusCode: 400,
    name: 'ValidationError',
    message: 'The request data is not valid',
    validation: null,
  }
  test('instance creation', () => {
    const instance = new ValidationError()
    expect(instance).toBeInstanceOf(ValidationError)
    expect(instance.name).toBe(defaults.name)
    expect(instance.message).toBe(defaults.message)
    expect(instance.statusCode).toBe(defaults.statusCode)
    expect(instance.validation).toBeNull()
  })
  test('constructor simple message assignment', () => {
    const val = 'I am an error'
    const instance = new ValidationError(val)
    expect(instance.validation).toBeNull()
    expect(instance.details).not.toBe(val)
    expect(instance.message).toBe(val)
  })
  test('constructor object message assignment', () => {
    const val: ObjectLiteralArray = [{ foo: 'bar' }]
    const instance = new ValidationError(val)
    expect(instance.message).not.toBe(val)
    expect(instance.details).not.toBe(val)
    expect(instance.validation).toBe(val)
  })
  test('constructor status code assignment', () => {
    const instance = new ValidationError('I am an error', 500)
    expect(instance.validation).toBeNull()
    expect(instance.statusCode).toBe(500)
  })
  test('constructor status code assignment with default message', () => {
    const instance = new ValidationError(null, 500)
    expect(instance.message).toBe(defaults.message)
    expect(instance.validation).toBeNull()
    expect(instance.statusCode).toBe(500)
  })
  test('constructor details assignment', () => {
    const val = { foo: 'bar' }
    const instance = new ValidationError('I am an error', 500, val)
    expect(instance.message).not.toBe(val)
    expect(instance.statusCode).not.toBe(val)
    expect(instance.validation).toBeNull()
    expect(instance.details).toBe(val)
  })
  test('constructor details assignment with defaults', () => {
    const val = { foo: 'bar' }
    const instance = new ValidationError(null, null, val)
    expect(instance.message).toBe(defaults.message)
    expect(instance.statusCode).toBe(defaults.statusCode)
    expect(instance.validation).toBeNull()
    expect(instance.details).toBe(val)
  })
})
