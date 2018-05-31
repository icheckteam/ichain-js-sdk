import * as core from '../../../src/keys/core'
import * as utils from '../../../src/utils'
import base58 from 'bs58'

var priv ="a96e62ed3955e65be32703f12d87b6b5cf26039ecfa948dc5107a495418e5330";
var pub =  "02950e1cdfcb133d6024109fd489f734eeb4502418e538c28481f22bce276f248c";
var addr = "7C2BB42A8BE69791EC763E51F5A49BCD41E82237";


describe('core', () => {
  describe('.getPublicKeyFromPrivateKey', () => {
    it('get public key, address from private key', () => {
      var _publicKey = core.getPublicKeyFromPrivateKey(utils.hexstring2ab(priv), true)
      _publicKey.should.eql(pub)
      var _address = core.getAddressFromPublicKey(_publicKey).toUpperCase()
      _address.should.eql(addr)
    })
  });
});