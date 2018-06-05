import * as stake from '../../../src/api/stake'
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

  it("editDelegations", () => {
    return stake.editDelegations({
      net: "testnet",
      privateKey: testKeys.a.privateKey,
      sequence: 0,
      chainId: "test",
      delegate: [
        {validator_addr: testKeys.a.address, delegator_addr: testKeys.b.address, bond: {demon: "icn", amount: 100}}
      ],
      unbond: [
        {validator_addr: testKeys.a.address, delegator_addr: testKeys.b.address, shares: "all"}
      ],
    })
  });

});