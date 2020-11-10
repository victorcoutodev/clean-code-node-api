const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor (loadUserByEmailRepository, encrypter) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
  }

  async auth (email, password) {
    if (!email) {
      return new MissingParamError('email')
    }
    if (!password) {
      return new MissingParamError('password')
    }
    if (!this.loadUserByEmailRepository) {
      return new InvalidParamError('loadUserByEmailRepository')
    }
    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) {
      return null
    }
    const isValid = await this.encrypter.compare(password, user.password)
    if (!isValid) {
      return null
    }
  }
}
