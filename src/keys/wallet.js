import Key from './key'
import { DEFAULT_WALLET, DEFAULT_SCRYPT } from '../consts'
import logger from '../logging'

const log = logger('wallet')
/**
 * @class Wallet
 */
class Wallet {
  constructor ({ name = 'myWallet', version = DEFAULT_WALLET.version, accounts = [], scrypt = DEFAULT_SCRYPT } = DEFAULT_WALLET) {
    /** @type {string} */
    this.name = name
    /** @type {string} */
    this.version = version;
    /** @type {ScryptParams} */
    this.scrypt = {
      n: scrypt.n || scrypt.cost,
      r: scrypt.r || scrypt.blockSize,
      p: scrypt.p || scrypt.parallel
    }
    /** @type {Key[]} */
    this.accounts = []
    for (const acct of accounts) {
      this.addAccount(acct)
    }
    log.info(`New Wallet created: ${this.name}`)
  }

  get [Symbol.toStringTag] () {
    return 'Wallet'
  }

  /**
   * Adds an account.
   * @param {Key} key - Key object.
   * @return {number} Index position of Account in array.
   */
  addAccount(acct) {
    const index = this.accounts.length
    if (!(acct instanceof Key)) {
      acct = new Key(acct)
    }
    this.accounts.push(acct)
    try {
      const address = acct.address
      log.info(`Added Account: ${address} to Wallet ${this.name}`)
    } catch (err) {
      log.warn(`Encrypted account added to Wallet ${this.name}. You will not be able to export this wallet without first decrypting this account`)
    }
    return index
  }

    /**
   * Returns the default Account according to the following rules:
   * 1. First Account where isDefault is true.
   * 2. First Account with a decrypted private key.
   * 3. First Account with an encrypted private key.
   * 4. First Account in the array.
   * Throws error if no accounts available.
   * @return {Account} Account
   */
  get defaultAccount () {
    if (this.accounts.length === 0) throw new Error('No accounts available in this Wallet!')
    for (const acct of this.accounts) {
      if (acct.isDefault) return acct
    }
    for (const acct of this.accounts) {
      if (acct._privateKey) return acct
    }
    for (const acct of this.accounts) {
      if (acct.encrypted) return acct
    }
    return this.accounts[0]
  }

  /**
   * Imports a Wallet through a JSON string
   * @param {string} - JSON string
   * @return {Wallet}
   */
  static import (jsonString) {
    const walletJson = JSON.parse(jsonString)
    return new Wallet(walletJson)
  }

  /**
  * Reads a Wallet file sync.
  * @param {string} filepath - Relative path from cwd
  * @return {Wallet}
  */
  static readFile (filepath) {
    log.info(`Importing wallet from file: ${filepath}`)
    return this.import(fs.readFileSync(filepath, 'utf8'))
  }

    /**
   * Attempts to decrypt Account at index in array.
   * @param {number} index - Index of Account in array.
   * @param {string} keyphrase - keyphrase
   * @return {boolean} Decryption success/failure
   */
  async decrypt (index, keyphrase) {
    if (index < 0) throw new Error('Index cannot be negative!')
    if (index >= this.accounts.length) throw new Error('Index cannot larger than Accounts array!')
    try {
      await this.accounts[index].decrypt(keyphrase, this.scrypt)
      return true
    } catch (err) { return false }
  }

  /**
   * Attempts to decrypt all accounts with keyphrase.
   * @param {string} keyphrase
   * @return {boolean[]} Each boolean represents if that Account has been decrypted successfully.
   */
  async decryptAll (keyphrase) {
    const accounts = this.accounts.map(async (acct, i) => {
      acct = await this.decrypt(i, keyphrase);
      return acct
    })
    const results = await Promise.all(accounts);
    log.info(`decryptAll for Wallet ${this.name}: ${results.reduce((c, p) => { return p + (c ? '1' : '0') }, '')}`)
    return results
  }

  /**
   * Attempts to encrypt Account at index in array.
   * @param {number} index - Index of Account in array.
   * @param {string} keyphrase
   * @return {boolean} Encryption success/failure
   */
  async encrypt (index, keyphrase) {
    if (index < 0) throw new Error('Index cannot be negative!')
    if (index >= this.accounts.length) throw new Error('Index cannot larger than Accounts array!')
    try {
      await this.accounts[index].encrypt(keyphrase, this.scrypt)
      return true
    } catch (err) { return false }
  }

  /**
   * Attempts to encrypt all accounts with keyphrase.
   * @param {string} keyphrase
   * @return {boolean[]} Each boolean represents if that Account has been encrypted successfully.
   */
  async encryptAll (keyphrase) {
    const accounts = this.accounts.map(async (acct, i) => {
      acct = await this.encrypt(i, keyphrase);
      return acct
    })
    const results = await Promise.all(accounts);
    log.info(`decryptAll for Wallet ${this.name}: ${results.reduce((c, p) => { return p + (c ? '1' : '0') }, '')}`)
    return results
  }


   /**
   * Export this class as a object
   * @return {object}
   */
  export () {
    return {
      name: this.name,
      version: this.version,
      scrypt: this.scrypt,
      accounts: this.accounts.map((acct) => acct.export()),
    }
  }

  /**
   * Set Account at index in array to be default account.
   * @param {number} index - The index of the Account in accounts array.
   * @return this
   */
  setDefault (index) {
    for (let i = 0; i < this.accounts.length; i++) {
      this.accounts[i].isDefault = i === index
    }
    log.info(`Set Account: ${this.accounts[index]} as default for Wallet ${this.name}`)
  }

  /**
   * Writes the Wallet file to a file.
   * @param {string} filepath
   * @return {Promise<boolean>} write success / failure
   */
  writeFile (filepath) {
    log.info(`Exporting wallet file to: ${filepath}`)
    return fs.writeFile(filepath, JSON.stringify(this.export()), (err) => {
      if (err) throw err
      log.info('Wallet file written!')
      return true
    })
  }
  
}


export default Wallet