import Key from '../../../src/keys/key'
import testWallet from './testWallet.json'
describe('Key method', function () {
  const scryptParams = {
    cost: 256,
    blockSize: 1,
    parallel: 1
  }

  const acct = {
    encrypted: '7wX2VPWUovJXimu4NYgmKrBgfb2Wsu3uabB1n1SWokF7pxJG9B5ayjh',
    privateKey: 'a96e62ed3955e65be32703f12d87b6b5cf26039ecfa948dc5107a495418e5330',
    publicKey: '02950e1cdfcb133d6024109fd489f734eeb4502418e538c28481f22bce276f248c',
    address: '7c2bb42a8be69791ec763e51f5a49bcd41e82237'
  }
  
  const keyphrase = 'thisisakeyphrase'

  describe('Constructor', function () {
    it('can created key private key', () => {
      const k = new Key(acct.privateKey)
      k.should.not.equal(undefined)
      k.privateKey.should.equal(acct.privateKey)
      k.publicKey.should.equal(acct.publicKey)
      k.address.should.equal(acct.address)
    })

    it('exports to a Wallet Account object', () => {
      const walletAcct = testWallet.accounts[0]
      const a = new Key(walletAcct)
      const result = a.export()
      result.should.eql(testWallet.accounts[0])
    })

    it('can be created from Wallet Account object', () => {
      const walletAcct = testWallet.accounts[0]
      const a = new Key(walletAcct)
      a.should.not.equal(undefined)
      a.encrypted.should.equal(walletAcct.key)
      a.address.should.equal(walletAcct.address)
    })

    it('Accepts a partial Account object and setup defaults', () => {
      const result = new Key({
        key: acct.encrypted,
        address: acct.address
      })
      result.name.should.equal(acct.address)
      result.isDefault.should.equal(false)
      result.lock.should.equal(false)
    })


  })


  it('encrypts the key', async () => {
    const a = new Key(acct.privateKey)
    await a.encrypt(keyphrase, scryptParams)
    a.encrypted.should.equal(acct.encrypted)
  })

  it('decrypts the key', async () => {
    const a = new Key(acct.encrypted)
    await a.decrypt(keyphrase, scryptParams)
    a.privateKey.should.equal(acct.privateKey)
  })

  it('throw error when insufficient infomation given', () => {
    const a = new Key(acct.address)
    const thrower = () => a.privateKey
    thrower.should.throw()
  });

 
})