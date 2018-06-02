import { ScryptParams } from './core';
export interface KeyLike {
  address: string
  name: string
  isDefault: boolean
  lock: boolean
  key: string
}



export class Key {
  constructor(str: string|object)

  encrypted: string
  privateKey: string
  publicKey: string
  address: string

  /** Retrieves the Public Key in encoded / unencoded form. */
  getPublicKey(encoded: boolean): string

  /** Encrypts the current privateKey and return the Account object. */
  encrypt(keyphrase: string, scryptParams?: ScryptParams): Key

  /** Decrypts the encrypted key and return the Account object. */
  decrypt(keyphrase: string, scryptParams?: ScryptParams): Key

  /** Export Account as a AccountLike object. */
  export(): KeyLike
}