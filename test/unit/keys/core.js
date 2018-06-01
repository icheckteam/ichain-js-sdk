import * as C from '../../../src/keys/core'

describe('Core Wallet Methods', function () {

  const keys = [
    {
      address: '01f3a9888113e7fe34280f7d5a867de1ff7b21d5',
      publicKey: '025a97f3ffcb723634b4acf91d039a79437f25fec670c4e88bcdda18cf87b57480',
      privateKey: 'a7b9775c6b9136bf89f63def7eab0c5f2d3d0c9e85492717f54386420cce5aa1',
    },
    {
      address: '7f4e9e56c8ecadeeb838bcaa691e3c741abfcc39',
      publicKey: '03da545679bf601325d7f851bac4fd0ff32811ad17c159f9d34bf64a385ee8fc4b',
      privateKey: '4f0d41eda93941d106d4a26cc90b4b4fddc0e03b396ac94eb439c5d9e0cd6548',
    },
    {
      address: '8097964142e7ac44144a78a0073bff969286958c',
      publicKey: '038b8f1d59518c2922d2c99bb1f222046fe844a384dcd3232e192c60dea0bc5d53',
      privateKey: '793466a3dfe3935a475d02290e37000a3e835f6740f9733e72e979d6e1166e13',
    },
  ]

  const unencodedTest = {
    address: '01f3a9888113e7fe34280f7d5a867de1ff7b21d5',
    publicKey: '045a97f3ffcb723634b4acf91d039a79437f25fec670c4e88bcdda18cf87b57480640aefa05159e66f4d820b0c8fccc6acd2b27531ae09fa4acc21a81895f4322e'
  }

  it('privateKey => publicKey', () => {
    keys.map((acct) => {
      const publicKey = C.getPublicKeyFromPrivateKey(acct.privateKey)
      publicKey.should.equal(acct.publicKey)
    })
  })

  it('publicKey => address', () => {
    keys.map((acct) => {
      const addr = C.getAddressFromPublicKey(acct.publicKey)
      addr.should.equal(acct.address)
    })
  })

  it('unencoded publicKey => address', () => {
    const address = C.getAddressFromPublicKey(C.getPublicKeyEncoded(unencodedTest.publicKey))
    address.should.equal(unencodedTest.address)
  })

  it('generate a private key', () => {
    const privateKey = C.generatePrivateKey()
    privateKey.should.have.length(64)
  })
});