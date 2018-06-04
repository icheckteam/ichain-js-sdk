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

  it("createAsset", () => {
    return asset.createAsset("testnet", testKeys.a.privateKey, {
      id: "tomato",
      name: "Tomato",
      quantity: 100,
      company: "Tomato comapny",
      email: "tomato@gmail.com"
    });
  });

  it("addQuantity", () => {
    return asset.addQuantity("testnet", testKeys.a.privateKey, {
      assetId: "tomatoRetailer",
      quantity: 100,
      materials: [
        { asset_id: "tomato", amount: 100}
      ]
    });
  });

  it("subtractQuantity", () => {
    return asset.subtractQuantity("testnet", testKeys.a.privateKey, "tomatoRetailer", 150);
  });

  it("createProposal", () => {
    return asset.createProposal("testnet", testKeys.a.privateKey, {
      assetId: "tomatoRetailer",
      recipient: testKeys.b.address,
      propertipes: ["height", "location"],
      role: 1,
    });
  });

  it("answerProposal", () => {
    return asset.answerProposal("testnet", testKeys.a.privateKey, {
      assetId: "tomatoRetailer",
      response: 1,
    });
  });

  it("revokeProposal", () => {
    return asset.revokeProposal("testnet", testKeys.a.privateKey, {
      assetId: "tomatoRetailer",
      recipient: testKeys.a.privateKey,
      propertipes: ["height"],
    });
  });
  it("updateAttributes", () => {
    return asset.updateAttributes("testnet", testKeys.a.privateKey, "tomatoRetailer", [
      {name: "weight", number_value: 100}
    ]);
  });


  it("getAsset", () => {
    return asset.getAsset("testnet", "tomato");
  });


  it("getHistory Weight", () => {
    return asset.getHistory("testnet", "tomato", "weight");
  });

  it("getHistory Price", () => {
    return asset.getHistory("testnet", "tomato", "price");
  });

  it("getHistory location", () => {
    return asset.getHistory("testnet", "tomato", "location");
  });

  it("getHistory quantity", () => {
    return asset.getHistory("testnet", "tomato", "quantity");
  });

  it("getMaterials", () => {
    return asset.getMaterials("testnet", "tomato");
  });
})