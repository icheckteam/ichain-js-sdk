import base58 from 'bs58'
import { getPublicKeyUnencoded } from './core'

/**
 * Checks if hexstring is a valid Private Key. Any hexstring of 64 chars is a valid private key.
 * @param {string} key
 * @return {boolean}
 */
export const isPrivateKey = (key) => {
  return /^[0-9A-Fa-f]{64}$/.test(key)
}

/**
 * Checks if hexstring is a valid Public Key. Accepts both encoded and unencoded forms.
 * @param {string} key
 * @param {boolean} [encoded] - Optional parameter to specify for a specific form. If this is omitted, this function will return true for both forms. If this parameter is provided, this function will only return true for the specific form.
 * @return {boolean}
 */
export const isPublicKey = (key, encoded) => {
  try {
    let encodedKey
    switch (key.substr(0, 2)) {
      case '04':
        if (encoded === true) return false
        // Encode key
        encodedKey = getPublicKeyEncoded(key)
        break
      case '02':
      case '03':
        if (encoded === false) return false
        encodedKey = key
        break
      default:
        return false
    }
    const unencoded = getPublicKeyUnencoded(encodedKey)
    const tail = parseInt(unencoded.substr(unencoded.length - 2, 2), 16)
    if (encodedKey.substr(0, 2) === '02' && tail % 2 === 0) return true
    if (encodedKey.substr(0, 2) === '03' && tail % 2 === 1) return true
  } catch (e) { }
  return false
}

