import { isHex, str2hexstring, sha256 } from '../utils'
import { generateSignature } from './core'
import { isPrivateKey } from './verify';
/**
 * Generates a signature of the message based on given private key.
 * @param {string} msg
 * @param {string} privateKey or WIF
 * @return {string} signature
 */
export const signMsg = (msg, privateKey) => {
  if (!isPrivateKey(privateKey)) throw new Error('Invalid private key or WIF')
  const msgHex = str2hexstring(msg)
  return generateSignature(msgHex, privateKey)
}