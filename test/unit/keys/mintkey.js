import * as mintkey from '../../../src/keys/mintkey'
import testKeys from '../testKeys.json'
import Key from '../../../src/keys/key'
import { isPrivateKey } from '../../../src/keys/verify';

describe('Mintkey', function () {
  const simpleScrypt = {
    cost: 256,
    blockSize: 1,
    parallel: 1,
    size: 64
  }

  describe('Basic', function () {
    let encrypted
    it('encrypt', async () => {
      this.timeout(0)
      encrypted = await mintkey.encrypt(testKeys.a.privateKey, testKeys.a.passphrase)
      encrypted.should.equal(testKeys.a.encryptedWif)
    })

    it('decrypt', async () => {
      const privateKey = await mintkey.decrypt(encrypted, testKeys.a.passphrase)
      isPrivateKey(privateKey).should.equal(true)
      privateKey.should.equal(testKeys.a.privateKey)
    })
  })

  describe('Non-english', function () {
    let encrypted
    const passphrase = testKeys.b.passphrase

    it('encrypt', async () => {
      encrypted = await mintkey.encrypt(testKeys.a.privateKey, passphrase, simpleScrypt)
      encrypted.should.not.equal(undefined)
    })

    it('decrypt', async () => {
      const privateKey = await mintkey.decrypt(encrypted, passphrase, simpleScrypt)
      isPrivateKey(privateKey).should.equal(true)
    })
  });

  describe('Symbols', function () {
    let encrypted
    const passphrase = testKeys.c.passphrase
    it('encrypt', async () => {
      encrypted = await mintkey.encrypt(testKeys.a.privateKey, passphrase, simpleScrypt)
      encrypted.should.not.equal(undefined)
    })
    it('decrypt', async () => {
      const privateKey = await mintkey.decrypt(encrypted, passphrase, simpleScrypt)
      isPrivateKey(privateKey).should.equal(true)
    })
  })
})