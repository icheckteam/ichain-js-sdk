import * as core from './core';
import logger from '../logging'
import { encrypt, decrypt } from './mintkey'
const log = logger('keys')
import { isPrivateKey } from './verify'

/**
 * @class Key
 */
class Key  {
  constructor(str) {
    this.isDefault = false
    this.lock = false
    if (str == "") {
      this._privateKey = core.generatePrivateKey()
    } else if (typeof str === 'object') {
      this._encrypted = str.key
      this._address = str.address
      this.name = str.name || ''
      this.isDefault = str.isDefault || false
      this.lock = str.lock || false
    } else if (isPrivateKey(str)) {
      this._privateKey = str
    } else {
      throw new ReferenceError(`Invalid input: ${str}`)
    }
  }

  /**
   * Key encrypted according to NEP2 standard.
   * @type {string}
   */
  get encrypted () {
    if (this._encrypted) {
      return this._encrypted
    } else {
      throw new Error('No encrypted key found')
    }
  }

  /**
   * Key of 64 hex characters.
   * @type {string}
   */
  get privateKey () {
    if (this._privateKey) {
      return this._privateKey
    } else if (this._encrypted) {
      throw new ReferenceError('Private Key encrypted!')
    } else {
      throw new ReferenceError('No Private Key provided!')
    }
  }

    /**
   * Returns the public key in encoded form. This is the form that is the short version (starts with 02 or 03). If you require the unencoded form, do use the publicKey method instead of this getter.
   * @type {string}
   *  */
  get publicKey () {
    if (this._publicKey) {
      return this._publicKey
    } else {
      this._publicKey = core.getPublicKeyFromPrivateKey(this.privateKey)
      return this._publicKey
    }
  }

  /**
   * Public address used to receive transactions. Case sensitive.
   * @type {string}
   */
  get address () {
    if (this._address) {
      return this._address
    } else {
      this._address = core.getAddressFromPublicKey(this.publicKey)
      return this._address
    }
  }

  /**
   * Encrypts the current privateKey and return the Account object.
   * @param {string} keyphrase
   * @param {object} [scryptParams]
   * @return {Account} this
   */
  encrypt (keyphrase, scryptParams = undefined) {
    this._encrypted = encrypt(this.privateKey, keyphrase, scryptParams)
    return this
  }

  /**
   * Decrypts the encrypted key and return the Account object.
   * @param {string} keyphrase
   * @param {object} [scryptParams]
   * @return {Account} this
   */
  decrypt (keyphrase, scryptParams = undefined) {
    this._privateKey =  decrypt(this.encrypted, keyphrase, scryptParams)
    return this
  }

  /**
   * Export Account as a AccountLike object.
   * @return {KeyLike}
   */
  export () {
    return {
      address: this.address,
      name: this.name,
      isDefault: this.isDefault,
      lock: this.lock,
      key: this.encryptedKey,
    }
  }
}

export default Key