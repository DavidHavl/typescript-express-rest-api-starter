import isObjectLiteral from 'is-plain-object'
function isObjectLiteralArray(value: any) {
  return (Array.isArray(value) && value.length > 0 && isObjectLiteral(value[0]))
}

export default isObjectLiteralArray
