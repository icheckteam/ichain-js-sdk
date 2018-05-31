import * as core from '../../../src/keys/core'
import * as utils from '../../../src/utils'
import base58 from 'bs58'

var keys = [
  {
    priv: "a96e62ed3955e65be32703f12d87b6b5cf26039ecfa948dc5107a495418e5330",
    pub: "02950e1cdfcb133d6024109fd489f734eeb4502418e538c28481f22bce276f248c",
    addr: "7C2BB42A8BE69791EC763E51F5A49BCD41E82237",
  }
]


describe('Core methods', () => {
  it('get public key addr from private key', () => {
    var _publicKey = core.getPublicKeyFromPrivateKey(utils.hexstring2ab(keys[0].priv), true)
    _publicKey.should.eql(keys[0].pub)
    var _addr = core.getAddressFromPublicKey(keys[0].pub).toUpperCase()
    _addr.should.eql(keys[0].addr)
  });
});