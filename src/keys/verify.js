import base58 from 'bs58'
import { getPublicKeyUnencoded } from './core'
import { ab2hexstring, reverseHex, hash256 } from '../utils';
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




/**
 * Verifies a Encrypt key. This merely verifies the format. It is unable to verify if it is has been tampered with.
 * @param {string} encryptKey
 * @return {boolean}
 */
export const isEncryptKey = (encryptKey) => {
  try {
    if (encryptKey.length !== 55) return false
    const hexStr = ab2hexstring(base58.decode(encryptKey))
    if (!hexStr) return false
    if (hexStr.length !== 80) return false
    return true
  } catch (e) { console.log(e); return false }
}


/**
 * Verifies an address using its checksum.
 * @param {string} address
 * @return {boolean}
 */
export const isAddress = (address) => {
  try {
    return address.length == 40
  } catch (e) { return false }
}