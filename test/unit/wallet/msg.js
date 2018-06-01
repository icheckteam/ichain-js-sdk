import * as M from '../../../src/keys/msg'
import * as utils from '../../../src/utils'
var keys = [
  {
    priv: "a96e62ed3955e65be32703f12d87b6b5cf26039ecfa948dc5107a495418e5330",
    pub: "02950e1cdfcb133d6024109fd489f734eeb4502418e538c28481f22bce276f248c",
    addr: "7C2BB42A8BE69791EC763E51F5A49BCD41E82237",
  }
]

describe('Msg methods', () => {
  it('sign using private key and verify', () => {
    const msg = "123"
    const signature = M.signMsg(msg, keys[0].priv)
    M.verifyMsg(msg, signature, keys[0].pub).should.equal(true)
  })
});