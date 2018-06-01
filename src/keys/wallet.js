import Key from './key'
import { DEFAULT_WALLET } from '../consts'
import logger from '../logging'

const log = logger('wallet')
/**
 * @class Wallet
 */
class Wallet {
  constructor ({ name = 'myWallet', version = DEFAULT_WALLET.version, accounts = [] } = DEFAULT_WALLET) {
    /** @type {string} */
    this.name = name
    /** @type {string} */
    this.version = version;
    /** @type {Key[]} */
    this.accounts = []
    accounts.map(this.addAccount, this)
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