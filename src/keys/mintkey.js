import SHA256 from 'crypto-js/sha256'
import latin1Encoding from 'crypto-js/enc-latin1'
import hexEncoding from 'crypto-js/enc-hex'
import AES from 'crypto-js/aes'
import scrypt from 'scrypt-js'
import { ab2hexstring, hexXor } from '../utils'
import logger from '../logging'
import ECBMode from 'crypto-js/mode-ecb'
import NoPadding from 'crypto-js/pad-nopadding'
import bs58check from 'bs58check' // This is importable because WIF specifies it as a dependency.
import Key from './key'
import { DEFAULT_SCRYPT } from '../consts'
const enc = {
  Latin1: latin1Encoding,
  Hex: hexEncoding
}

const AES_OPTIONS = { mode: ECBMode, padding: NoPadding }

const log = logger("keys")

/**
 * Encrypts a WIF key using a given keyphrase 
 * @param {string} privateKey the privateKey to encrypt
 * @param {string} keyphrase - The password will be encoded as UTF-8 and normalized using Unicode Normalization Form C (NFC).
 * @param {scryptParams} [scryptParams] - Parameters for Scrypt. Defaults to NEP2 specified parameters.
 * @returns {Promise} The encrypted key in Base58 (Case sensitive).
 */
export const encrypt = (privateKey, keyphrase, scryptParams = DEFAULT_SCRYPT) => {
  const account = new Key(privateKey);
  return new Promise((resolve, reject) => {
    scryptParams = ensureScryptParams(scryptParams)
    const { n, r, p } = scryptParams
    // SHA Salt (use the first 4 bytes)
    const addressHash = SHA256(SHA256(enc.Latin1.parse(account.address))).toString().slice(0, 8)
    scrypt(Buffer.from(keyphrase.normalize('NFC'), 'utf8'), Buffer.from(addressHash, 'hex'), n, r, p, 64, (error, progress, key) => {
      if (error != null) {
        reject(error)
      } else if (key) {
        const derived = Buffer.from(key).toString('hex')
        const derived1 = derived.slice(0, 64)
        const derived2 = derived.slice(64)
        // AES Encrypt
        const xor = hexXor(account.privateKey, derived1)
        const encrypted = AES.encrypt(enc.Hex.parse(xor), enc.Hex.parse(derived2), AES_OPTIONS)
        const assembled = addressHash + encrypted.ciphertext.toString()
        const encryptedKey = bs58check.encode(Buffer.from(assembled, 'hex'))
        log.info(`Successfully encrypted key to ${encryptedKey}`)
        resolve(encryptedKey)
      }
    })
  })
}

/**
 * Decrypts an encrypted key using a given keyphrase.
 * @param {string} encryptedKey - The encrypted key (58 chars long).
 * @param {string} keyphrase - The password will be encoded as UTF-8 and normalized using Unicode Normalization Form C (NFC).
 * @param {scryptParams} [scryptParams] - Parameters for Scrypt. Defaults to NEP2 specified parameters.
 * @returns {Promise} 
 */
export const decrypt = (encryptedKey, keyphrase, scryptParams = DEFAULT_SCRYPT) => {
  return new Promise((resolve, reject) => {
    scryptParams = ensureScryptParams(scryptParams)
    const { n, r, p } = scryptParams
    const assembled = ab2hexstring(bs58check.decode(encryptedKey))
    const addressHash = assembled.substr(0, 8)
    const encrypted = assembled.substr(-64)
    scrypt(Buffer.from(keyphrase.normalize('NFC'), 'utf8'), Buffer.from(addressHash, 'hex'), n, r, p, 64, (error, progress, key) => {
      if (error != null) {
        reject(error)
      } else if (key) {
        const derived = Buffer.from(key).toString('hex')
        const derived1 = derived.slice(0, 64)
        const derived2 = derived.slice(64)
        const ciphertext = { ciphertext: enc.Hex.parse(encrypted), salt: '' }
        const decrypted = AES.decrypt(ciphertext, enc.Hex.parse(derived2), AES_OPTIONS)
        const privateKey = hexXor(decrypted.toString(), derived1)
        const account = new Key(privateKey)
        const newAddressHash = SHA256(SHA256(enc.Latin1.parse(account.address))).toString().slice(0, 8)
        if (addressHash !== newAddressHash) reject(new Error('Wrong Password or scrypt parameters!'))
        log.info(`Successfully decrypted ${encryptedKey}`)
        resolve(privateKey)
      }
    })
  })
}

const ensureScryptParams = (params) => {
  const oldParams = Object.assign({}, DEFAULT_SCRYPT, params)
  return {
    n: oldParams.n || oldParams.cost,
    r: oldParams.r || oldParams.blockSize,
    p: oldParams.p || oldParams.parallel
  }
}