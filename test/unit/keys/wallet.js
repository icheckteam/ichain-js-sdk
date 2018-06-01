
import Wallet from '../../../src/keys/wallet'
import simpleWallet from './simpleWallet.json'
import testWallet from './testWallet.json'
import Key from '../../../src/keys/key';

describe('Wallet file', () => {
  describe('Constructor', () => {
    it("default", () => {
      const w = new Wallet();
      w.should.not.equal(undefined)
      w.name.should.equal("myWallet")
    });

    it('only name', () => {
      const w = new Wallet({ name: 'NamedWallet' })
      w.should.not.equal(undefined)
      w.name.should.equal("NamedWallet")
      w.accounts.should.eql([])
    }) 

    it('custom config', () => {
      const config = {
        name: 'new wallet',
        scrypt: {
          n: 256,
          r: 1,
          p: 1
        }
      }
      const w = new Wallet(config)
      w.name.should.equal(config.name)
      w.scrypt.should.eql(config.scrypt)
      w.accounts.should.eql([])
    })

  });

  describe('get defaultAccount', async () => {
    const w = new Wallet(simpleWallet)
    await w.decrypt(1, w.accounts[1].name)
    it('returns first default', () => {
      w.defaultAccount.should.equal(w.accounts[2])
    })

    it('returns first decrypted account when no defaults', () => {
      w.accounts[2].isDefault = false
      w.defaultAccount.should.eql(w.accounts[0])
    })

    it('returns first encrypted account when no defaults and decrypted', () => {
      w.accounts[1]._privateKey = undefined
      w.defaultAccount.should.eql(w.accounts[0])
    })

  });

  it('import', () => {
    const testWalletString = JSON.stringify(testWallet)
    const w = Wallet.import(testWalletString)
    w.name.should.equal('myWallet')
    w.scrypt.should.eql(testWallet.scrypt)
    for (let i = 0; i < w.accounts.length; i++) {
      w.accounts[i].export().should.eql(testWallet.accounts[i])
    }
  })

  it('export', () => {
    const w = new Wallet(testWallet)
    const exportObj = w.export()
    exportObj.should.eql(testWallet)
    const imported = Wallet.import(JSON.stringify(exportObj))
    w.should.eql(imported)
  })


  describe('addAccount', function () {
    const w = new Wallet()
    it('Account', () => {
      const acct = new Key()
      const i = w.addAccount(acct)
      i.should.equal(0)
      w.accounts.length.should.equal(1)
      w.accounts[0].should.eql(acct)
    })

    it('Key', () => {
      const i = w.addAccount('a7b9775c6b9136bf89f63def7eab0c5f2d3d0c9e85492717f54386420cce5aa1')
      i.should.equal(1)
      w.accounts.length.should.equal(2)
      w.accounts[1].should.be.an.instanceof(Key)
    })
  })

  it('setDefault', () => {
    // Original default is index 1
    const w = new Wallet(testWallet)
    w.accounts[1].isDefault.should.equal(true)
    const newDefault = 2
    w.setDefault(newDefault)
    for (let i = 0; i < w.accounts.length; i++) {
      w.accounts[i].isDefault.should.equal(i === newDefault)
    }
  })


  describe('decrypt/encrypt', function () {
    const w = new Wallet(simpleWallet)
    this.timeout(0)
    it('decryptAll', async () => {
      const decrypted = await w.decryptAll(simpleWallet.accounts[1].name)
      decrypted.should.eql([true, true, true, true, true])
      w.accounts[1].privateKey.should.not.equal(undefined)
    })

    it('encryptAll', async () => {
      const encrypted = await w.encryptAll(simpleWallet.accounts[1].name)
      encrypted.should.eql([true, true, true, true, true])
    })
  })


});