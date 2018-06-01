import Key from '../../../src/keys/key'

describe('Key method', function () {
  const acct = {
    name: "account name",
    privateKey: 'a96e62ed3955e65be32703f12d87b6b5cf26039ecfa948dc5107a495418e5330',
    publicKey: '02950e1cdfcb133d6024109fd489f734eeb4502418e538c28481f22bce276f248c',
    address: '7c2bb42a8be69791ec763e51f5a49bcd41e82237'
  }

  describe('Constructor', function () {
    it('can created key private key', () => {
      const k = new Key(acct.privateKey)
      k.should.not.equal(undefined)
      k.privateKey.should.equal(acct.privateKey)
      k.publicKey.should.equal(acct.publicKey)
      k.address.should.equal(acct.address)
    })
  })
})