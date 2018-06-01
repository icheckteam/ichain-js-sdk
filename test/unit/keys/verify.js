import * as V from '../../../src/keys/verify'
import Key from '../../../src/keys/key'
import * as core from '../../../src/keys/core'

describe('Key Verification', function () {
  const valid = {
    privateKeys: [
      'a7b9775c6b9136bf89f63def7eab0c5f2d3d0c9e85492717f54386420cce5aa1',
      '4f0d41eda93941d106d4a26cc90b4b4fddc0e03b396ac94eb439c5d9e0cd6548',
      '793466a3dfe3935a475d02290e37000a3e835f6740f9733e72e979d6e1166e13'
    ],

    encryptKeys: [
      '7wX2VPWUovJXimu4NYgmKrBgfb2Wsu3uabB1n1SWokF7pxJG9B5ayjh'
    ],

    publicKeys: [
      '025a97f3ffcb723634b4acf91d039a79437f25fec670c4e88bcdda18cf87b57480',
      '03da545679bf601325d7f851bac4fd0ff32811ad17c159f9d34bf64a385ee8fc4b',
      '038b8f1d59518c2922d2c99bb1f222046fe844a384dcd3232e192c60dea0bc5d53'
    ],
    publicKeysUnencoded: [ 
      '045a97f3ffcb723634b4acf91d039a79437f25fec670c4e88bcdda18cf87b57480640aefa05159e66f4d820b0c8fccc6acd2b27531ae09fa4acc21a81895f4322e',
      '04da545679bf601325d7f851bac4fd0ff32811ad17c159f9d34bf64a385ee8fc4b00e41cec1bccea2e647b079438d8c8d6c2c2c5f4540baebae5b08ff63bdde9f1',
      '048b8f1d59518c2922d2c99bb1f222046fe844a384dcd3232e192c60dea0bc5d536cef38b546ccb0fa092eb2fc4466720e567ebee977383e6b1fa80d6ea40ef519' 
    ],
    addresses: [
      '01f3a9888113e7fe34280f7d5a867de1ff7b21d5',
      '7f4e9e56c8ecadeeb838bcaa691e3c741abfcc39',
      '8097964142e7ac44144a78a0073bff969286958c'    
    ]
  }

  const invalid = {
    encryptKeys: [
      '7wX2VPWUovJXimu4NYgmKrBgfb2Wsu3uabB1n1SWokF7pxJG9B5ayj2'
    ],

    privateKeys: [
      'a7b9775c6b9136bf89f63def7eab0c5f2d3d0c9e85492717f54386420cce',
      '4f0d41eda93941d106d4a26cc90b4b4fddc0e03b396ac94eb439c5d9e0cd654g',
      '793466a3dfe3935a475d02290e37000a3e835f6740f9733e72e979d6e1166e1364'
    ],
    publicKeys: [
      '02963fc761eb7135c4593bfc6a0af96d8588b70d8f6ef3af8549181e57772181f5',
      '03c663ba46afa8349f020eb9e8f9e1dc1c8e877b9d239e139af699049126e0f321',
      '02c1a9b2d0580902a6c2d09a8febd0a7a13518a9a61d08183f09ff929b66ac7c26'
    ],
    addresses: [
      '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      'AYYrr4GauveRr45WwAJyw6izvEMvasBBXh',
      '1BoatSLRHtKNngkdXEeobR76b53LETtpyT' // BTC Address
    ]
  }

  it('returns true for valid encrypt', () => {
    valid.encryptKeys.map((encryptKey) => V.isEncryptKey(encryptKey).should.be.true)
  })

  it('returns true for valid privateKey', () => {
    valid.privateKeys.map((key) => V.isPrivateKey(key).should.be.true)
  })

  it('returns true for valid publicKey(Encoded)', () => {
    valid.publicKeys.map((key) => V.isPublicKey(key).should.be.true)
    valid.publicKeys.map((key) => V.isPublicKey(key, true).should.be.true)
  })

  it('returns true for valid publicKey(Unencoded)', () => {
    valid.publicKeysUnencoded.map((key) => V.isPublicKey(key).should.be.true)
  })

  it('returns true for valid address', () => {
    valid.addresses.map((addr) => V.isAddress(addr).should.be.true)
  })

  it('returns false for invalid privateKey', () => {
    invalid.privateKeys.map((key) => V.isPrivateKey(key).should.be.false)
  })

  it('returns false for invalid publicKey', () => {
    invalid.publicKeys.map((key) => V.isPublicKey(key).should.be.false)
    valid.publicKeys.map((key) => V.isPublicKey(key, false).should.be.false)
    valid.publicKeysUnencoded.map((key) => V.isPublicKey(key, true).should.be.false)
  })

  it('returns false for invalid address', () => {
    invalid.addresses.map((addr) => V.isAddress(addr).should.be.false)
  })
})