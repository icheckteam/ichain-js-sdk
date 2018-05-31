import { ec as EC } from 'elliptic'
import base58 from 'bs58'
import { hexstring2ab, ab2hexstring, reverseHex, sha256, hash160, hash256, str2hexstring } from '../utils'
import secureRandom from 'secure-random'
const curve = new EC('secp256k1')

/**
 * @param {string} publickey - unencoded public key
 * @return {string} encoded public key
 */
export const getPublicKeyEncoded = (publicKey) => {
  let publicKeyArray = hexstring2ab(publicKey)
  if (publicKeyArray[64] % 2 === 1) {
    return '03' + ab2hexstring(publicKeyArray.slice(1, 33))
  } else {
    return '02' + ab2hexstring(publicKeyArray.slice(1, 33))
  }
}

/**
 * @param {string} publicKey - Encoded public key
 * @return {string} decoded public key
 */
export const getPublicKeyUnencoded = (publicKey) => {
  let keyPair = curve.keyFromPublic(publicKey, 'hex')
  return keyPair.getPublic().encode('hex')
}

/**
 * Calculates the public key from a given private key.
 * @param {string} privateKey
 * @param {boolean} encode - Returns the encoded form if true.
 * @return {string}
 */
export const getPublicKeyFromPrivateKey = (privateKey, encode = true) => {
  const curve = new EC('secp256k1')
  const keypair = curve.keyFromPrivate(privateKey, 'hex')
  const unencodedPubKey = keypair.getPublic().encode('hex')
  if (encode) {
    let tail = parseInt(unencodedPubKey.substr(64 * 2, 2), 16)
    if (tail % 2 === 1) {
      return '03' + unencodedPubKey.substr(2, 64)
    } else {
      return '02' + unencodedPubKey.substr(2, 64)
    }
  } else return unencodedPubKey
}

export const getAddressFromPublicKey = (publicKey) => {
  return hash160(publicKey)
}

/**
 * Generates a signature of the transaction based on given private key.
 * @param {string} tx - Serialized unsigned transaction.
 * @param {string} privateKey - Private Key.
 * @return {string} Signature. Does not include tx.
 */
export const generateSignature = (tx, privateKey) => {
  let elliptic = new EC('secp256k1')
  const keypair = curve.keyFromPrivate(privateKey, 'hex')
  const sig = keypair.sign(Buffer.from( sha256(tx), 'hex'), "hex")
  return ab2hexstring(sig.toDER())
}

/**
 * Generates a random private key
 * @returns {string}
 */
export const generatePrivateKey = () => {
  return ab2hexstring(secureRandom(32))
}

/**
 * Generates a arrayBuffer filled with random bits.
 * @param {number} length - Length of buffer.
 * @returns {ArrayBuffer}
 */
export const generateRandomArray = (length) => {
  return secureRandom(length)
}