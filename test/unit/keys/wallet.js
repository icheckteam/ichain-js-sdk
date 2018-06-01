
import Wallet from '../../../src/keys/wallet'
import simpleWallet from './simpleWallet.json'
describe('Wallet file', () => {
  describe('Constructor', () => {
    it("default", () => {
      const w = new Wallet();
      w.should.not.equal(undefined)
      w.name.should.equal("myWallet")
    });
    it('only name', () => {
      const w = new Wallet({ name: 'NamedWallet' })
      w.should.not.equal(undefined)
      w.name.should.equal("NamedWallet")
      w.accounts.should.eql([])
    }) 
  });

  describe('get defaultAccount', function () {
    const w = new Wallet(simpleWallet)
    it('returns first default', () => {
      w.defaultAccount.should.equal(w.accounts[1])
    })
  });

});