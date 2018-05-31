import * as core from './core';
import logger from '../logging'
const log = logger('keys')
import { isPrivateKey } from './verify'

/**
 * @class Account
 * @classdesc
 * This allows for simple utilisation and manipulating of key without need the long access methods.
 * @param {string} name  the name of account
 * @param {string} privateKey the private key of account 
 */
class Account  {
  constructor(str) {
    this.isDefault = false
    this.lock = false
    if (str == "") {
      this.privateKey = core.generatePrivateKey()
    } else if (typeof str === 'object') {
      this.privateKey = str.key
      this.address = str.address
      this.name = str.name || ''
      this.isDefault = str.isDefault || false
      this.lock = str.lock || false
    } else if (isPrivateKey(str)) {
      this.privateKey = str
    }
    this.publicKey = core.getPublicKeyFromPrivateKey(this.privateKey)
    this.address = core.getAddressFromPublicKey(this.publicKey)
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
      key: this.privateKey,
    }
  }
}

export default Account