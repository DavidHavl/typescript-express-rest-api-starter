import isPlainObjectArray from '@/lib/utils/isPlainObjectArray'

describe('isPlainObjectArray', () => {
  test('Correctly evaluates variables', () => {
    expect(isPlainObjectArray([{ foo: 'bar' }])).toBe(true)
    expect(isPlainObjectArray([{ foo: 'bar' }, {}])).toBe(true)
    expect(isPlainObjectArray([{}])).toBe(true)
    expect(isPlainObjectArray([{}, {}])).toBe(true)
    expect(isPlainObjectArray([])).toBe(false)
    expect(isPlainObjectArray({ foo: 'bar' })).toBe(false)
    expect(isPlainObjectArray(new Date())).toBe(false)
  })
})
