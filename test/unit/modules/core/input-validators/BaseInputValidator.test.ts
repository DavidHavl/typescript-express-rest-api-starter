import BaseInputValidator from '@/lib/input-validators/BaseInputValidator'
import joi from 'joi'

describe('Base Input Validator', () => {
  const schema = joi.object().keys({
    id: joi.number().required(),
    name: joi.string().trim().alphanum().required(),
  })
  let instance: any | BaseInputValidator = null
  beforeEach(() => {
    instance = new BaseInputValidator()
    instance.schema = schema
  })
  test('constructor creates instance', () => {
    expect(instance).toBeInstanceOf(BaseInputValidator)
  })

  test('setData method sets data via object', () => {
    const data = { foo: 'bar' }
    expect(instance['data']).toBe(null)
    instance.setData(data)
    expect(instance['data']).toEqual(data)
  })

  test('sets data via constructor', () => {
    const data = { foo: 'bar' }
    expect(instance['data']).toBe(null)
    instance = new BaseInputValidator(data)
    expect(instance['data']).toEqual(data)
  })

  test('isValid method assign data if data is passed via param', () => {
    const data = {
      id: 123,
      name: 'david',
    }
    expect(instance.data).toBe(null)
    instance.isValid(data)
    expect(instance.data).toEqual(data)
  })

  test('isValid method returns true on valid data', () => {
    const data = {
      id: 123,
      name: 'david',
    }
    instance.setData(data)
    const result = instance.isValid()
    expect(result).toBe(true)
  })

  test('isValid method returns true on valid data passed as param', () => {
    const data = {
      id: 123,
      name: 'david',
    }
    const result = instance.isValid(data)
    expect(result).toBe(true)
  })

  test('isValid method returns false on invalid data', () => {
    const data = {
      name: 123,
    }
    const result = instance.isValid(data)
    expect(result).toBe(false)
  })

  test('getErrors method returns errors on wrong data', () => {
    const data = {
      name: 123,
    }
    instance.isValid(data)
    expect(Array.isArray(instance.getErrors())).toBe(true)
    expect(instance.getErrors().length).toBeGreaterThan(0)
  })

  test('getErrors method returns no errors on correct data', () => {
    const data = {
      id: 123,
      name: 'david',
    }
    instance.isValid(data)
    expect(instance.getErrors()).toBe(null)
  })

  test('getCleanData method returns clean data', () => {
    const data = {
      id: 123,
      name: ' david ',
    }
    const expected = {
      id: 123,
      name: 'david',
    }
    instance.isValid(data)
    expect(instance.getCleanData()).toEqual(expected)
  })

  test('getCleanData method returns empty object on error', () => {
    const data = {
      id: 123,
    }
    instance.isValid(data)
    expect(instance.getCleanData()).toEqual({})
  })

  test('stripUnknownFields flag strips unknown fields', () => {
    const data = {
      id: 123,
      name: 'david',
      fieldToStrip: 'hello',
    }
    const expected = {
      id: 123,
      name: 'david',
    }
    instance.isValid(data)
    expect(instance.getCleanData()).toEqual(expected)
    instance.stripUnknownFields = false
    instance.isValid(data)
    expect(instance.getErrors()).toBe(null)
    expect(instance.getCleanData()).toEqual(data)
  })
})
