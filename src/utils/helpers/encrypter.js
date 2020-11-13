const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class Encrypter {
  async compare (value, hash) {
    if (!value) {
      return new MissingParamError('value')
    }
    if (!hash) {
      return new MissingParamError('hash')
    }
    const isValid = bcrypt.compare(value, hash)
    return isValid
  }
}
