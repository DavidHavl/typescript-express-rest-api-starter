import isPlainObject from 'is-plain-object'
export default function isPlainObjectArray(value: any) {
  return (Array.isArray(value) && value.length > 0 && isPlainObject(value[0]))
}
