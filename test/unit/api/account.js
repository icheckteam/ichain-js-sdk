import * as account from '../../../src/api/account'
import testKeys from '../testKeys.json'
import mockData from './mockData.json'
describe('Account API', function () {
  let mock

  before(() => {
    mock = setupMock([mockData.ichainDB])
  })

  after(() => {
    mock.restore()
  })

  it("getAssets", () => {
    return account.getAssets("testnet", "ABC");
  });

  it("getAccount", () => {
    return account.getAccount("testnet", "ABC");
  });

  it("getIdentities", () => {
    return account.getIdentities("testnet", "ABC");
  });

})