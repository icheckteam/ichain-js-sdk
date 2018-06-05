import * as asset from '../../../src/api/asset'
import testKeys from '../testKeys.json'
import mockData from './mockData.json'
import MsgCreateAsset from '../../../src/messages/create-asset';
describe('Asset API', function () {
  let mock

  let baseOptions = {
    net: "testnet",
    privateKey: testKeys.a.privateKey,
  }

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
    return asset.createAsset(Object.assign(baseOptions, {
      asset: {
        issuer: testKeys.a.address,
        id: "tomato",
        name: "Tomato",
      }
    }));
  });

  it("addQuantity", () => {
    return asset.addQuantity(Object.assign(baseOptions, {
      addQuantity: {
        issuer: testKeys.a.address,
        id: "tomato",
        name: "Tomato",
        quantity: 1,
        materials: [],
      }
    }));
  });

  it("subtractQuantity", () => {
    return asset.subtractQuantity(Object.assign(baseOptions, {
      subtractQuantity: {
        issuer: testKeys.a.address,
        id: "tomato",
        quantity: 1,
      }
    }));
  });

  it("createProposal", () => {
    return asset.createProposal(Object.assign(baseOptions, {
      proposal: {
        asset_id: "tomato",
        issuer: testKeys.a.address,
        recipient: testKeys.b.recipient,
        propertipes: ["weight"],
        role: 1,
      }
    }));
  });

  it("answerProposal", () => {
    return asset.answerProposal(Object.assign(baseOptions, {
      answerProposal: {
        asset_id: "tomato",
        recipient: testKeys.b.recipient,
        response: 1,
      }
    }));
  });

  it("revokeProposal", () => {
    return asset.revokeProposal(Object.assign(baseOptions, {
      revokeProposal: {
        asset_id: "tomato",
        issuer: testKeys.a.address,
        recipient: testKeys.b.recipient,
        propertipes: ["weight"],
      }
    }));
  });
  it("updateAttributes", () => {
    return asset.updateAttributes(Object.assign(baseOptions, {
      updateAttributes: {
        issuer: testKeys.a.address,
        id: "tomato",
        attributes: []
      },
    }));
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