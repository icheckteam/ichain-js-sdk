import * as M from '../../../src/keys/msg'
import * as utils from '../../../src/utils'
var keys = [
  {
    priv: "a7b9775c6b9136bf89f63def7eab0c5f2d3d0c9e85492717f54386420cce5aa1",
    pub: "025a97f3ffcb723634b4acf91d039a79437f25fec670c4e88bcdda18cf87b57480",
    addr: "01f3a9888113e7fe34280f7d5a867de1ff7b21d5",
    message: 'test'

  },
  
  {
    priv: "4f0d41eda93941d106d4a26cc90b4b4fddc0e03b396ac94eb439c5d9e0cd6548",
    pub: "03da545679bf601325d7f851bac4fd0ff32811ad17c159f9d34bf64a385ee8fc4b",
    addr: "7f4e9e56c8ecadeeb838bcaa691e3c741abfcc39",
    message: 'test1'
  },
]

describe('Msg methods', () => {
  it('sign using private key and verify', () => {
    const signature = M.signMsg(keys[0].message, keys[0].priv)
    M.verifyMsg(keys[0].message, signature, keys[0].pub).should.equal(true)
  })

  it('not verify signature with wrong public key', () => {
    const signature = M.signMsg(keys[0].message, keys[0].priv)
    M.verifyMsg(keys[0].message, signature, keys[1].pub).should.equal(false)
  })

  it('not verify signature with changed message', () => {
    const signature = M.signMsg(keys[0].message, keys[0].priv)
    M.verifyMsg(keys[1].message, signature, keys[0].pub).should.equal(false)
  })

  it('raise error for invalid public Key', () => {
    ; (function () {
      const signature = M.signMsg(keys[0].message, keys[0].priv)
      M.verifyMsg(keys[0].message, signature, 'x')
    }.should.throw(Error, 'Invalid public key'))
  })

  it('raise error for invalid signature', () => {
    ; (function () {
      M.verifyMsg(keys[1].message, 'x', keys[1].priv).should.equal(false)
    }.should.throw(Error, 'Invalid signature format expected hex'))
  })
});