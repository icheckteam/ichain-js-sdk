import testKeys from '../testKeys.json'
import mockData from './mockData.json'
import { identity } from '../../../src/api';
import MsgCreateClaim from '../../../src/messages/create-claim';
import MsgRevokeClaim from '../../../src/messages/revoke-cliam';
describe('Identity API', function () {
  let mock

  before(() => {
    mock = setupMock([mockData.ichainDB])
  })

  after(() => {
    mock.restore()
  })

  it("createClaim", () => {
    return identity.createClaim({
      net: "testnet",
      privateKey: testKeys.a.privateKey,
      sequence: 0,
      chainId: "test",
      claim: new MsgCreateClaim({
        id: "claim1",
        context: "context",
        content: {
          name: "1"
        },
        metadata: {
          create_time: 1528100960, 
        }
      })
    })
  });


  it("revokeClaim", () => {
    return identity.revokeClaim({
      net: "testnet",
      privateKey: testKeys.a.privateKey,
      sequence: 0,
      chainId: "test",
      revokeClaim: new MsgRevokeClaim({
        claim_id: "1",
        owner: testKeys.a.address,
        revocation: "revocation test"
      })
    })
  });

});