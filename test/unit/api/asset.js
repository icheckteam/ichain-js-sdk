import * as asset from '../../../src/api/asset'
import testKeys from '../testKeys.json'
import mockData from './mockData.json'
describe('Core API', function () {
  let mock

  before(() => {
    mock = setupMock([mockData.ichainDB])
  })

  after(() => {
    mock.restore()
  })

  it("sendAsset", () => {
    return asset.sendAsset("testnet", testKeys.a.privateKey, testKeys.b.address, [{amount: 10, assetId: "1"}]);
  });
})