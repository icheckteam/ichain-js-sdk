import { isHex, str2hexstring, sha256, hexstring2ab } from '../utils'
import { generateSignature } from './core'
import { isPrivateKey, isPublicKey } from './verify';
import { ec as EC } from 'elliptic'
import BN from 'bn.js'
/**
 * Converts signatureHex to a signature object with r & s.
 * @param {string} signatureHex
 */
const getSignatureFromHex = signatureHex => {
  return hexstring2ab(signatureHex)
}


/**
 * Generates a signature of the message based on given private key.
 * @param {string} msg
 * @param {string} privateKey
 * @return {string} signature
 */
export const signMsg = (msg, privateKey) => {
  if (!isPrivateKey(privateKey)) throw new Error('Invalid private key')
  const msgHex = str2hexstring(msg)
  return generateSignature(msgHex, privateKey)
}

/**
 * Verifies signature matches message and is valid for given public key.
 * @param {string} message
 * @param {string} publicKey
 * @param {string} signature
 * @return {boolean}
 */
export const verifyMsg = (message, signature, publicKey) => {
  if (!isHex(signature)) throw new Error('Invalid signature format expected hex')
  if (!isPublicKey(publicKey)) throw new Error('Invalid public key')
  const curve = new EC('secp256k1')
  const sig = getSignatureFromHex(signature)
  const messageHex = str2hexstring(message)
  const messageHash = sha256(messageHex)
  return curve.verify(messageHash, sig, publicKey, 'hex')
}