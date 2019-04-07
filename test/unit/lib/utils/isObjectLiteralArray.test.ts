import isObjectLiteralArray from '@/lib/utils/isObjectLiteralArray'

describe('isObjectLiteralArray', () => {
  test('Correctly evaluates variables', () => {
    expect(isObjectLiteralArray([{ foo: 'bar' }])).toBe(true)
    expect(isObjectLiteralArray([{ foo: 'bar' }, {}])).toBe(true)
    expect(isObjectLiteralArray([{}])).toBe(true)
    expect(isObjectLiteralArray([{}, {}])).toBe(true)
    expect(isObjectLiteralArray([])).toBe(false)
    expect(isObjectLiteralArray({ foo: 'bar' })).toBe(false)
    expect(isObjectLiteralArray(new Date())).toBe(false)
  })
})
