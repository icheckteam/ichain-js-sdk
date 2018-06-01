import Key from '../../../src/keys/key'
import testKeys from '../testKeys.json'
describe('Key method', function () {
  const scryptParams = {
    cost: 256,
    blockSize: 1,
    parallel: 1
  }
  
  const keyphrase = 'thisisakeyphrase'

  describe('Constructor', function () {
    it('can created key private key', () => {
      const k = new Key(testKeys.a.privateKey)
      k.should.not.equal(undefined)
      k.privateKey.should.equal(testKeys.a.privateKey)
      k.publicKey.should.equal(testKeys.a.publicKey)
      k.address.should.equal(testKeys.a.address)
    })
  })


})