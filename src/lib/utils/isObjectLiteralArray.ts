import isObjectLiteral from 'is-plain-object'
export default function isObjectLiteralArray(value: any) {
  return (Array.isArray(value) && value.length > 0 && isObjectLiteral(value[0]))
}
