# ichain-js-sdk
Javascript SDK for the ichain core

## Keys
```js
// POST /keys {name, password, seed}
ichain.createKey("username", "password", "seed")

// GET /keys
ichain.listKeys()

// DELETE /keys/{name}
ichain.deleteKey(name)

// PUT /keys/{name} {new_password, old_password}
ichain.updateKey(new_password, old_password)
```

## RPC

```js
// GET /blocks/latest

// GET /blocks/{height}

//Lưu block height hiện tại dưới local, đồng bộ block hiện tại để index giao dịch
// block {txs: [1, 2]}
// txs.concat(block.txs)

// GET /tx/hash

## Example 
var state {
  currentHeight: 10,
  txByID: {1: "{assetId: "34342", to: "2423", from: "aa", "quanttiy": 100}"},
  txs: [1],
  account: {
    assets: [{id: 4x5, name: "tomato", quantity: 100}],
    txs: [1]
  }
}
```



## Identity

```js
var ichain = require("ichain")

var claim = {
  id: "449595",
  content: {
    name: "Claim name"
  },
  metadata: {
    issuer: "59DC99940345934590359389BGGRGFGF",
    recipient: "59DC99940345934590359389BGGRGFGF",
    create_time: "2019-24-24",
    expires: "2019-24-24",
  }
}

// Create new claim 
// POST /claim/issue BODY {claim, account_name: "username", password: "292"}
ichain.createClaim(claim)


// revoke claim
// POST /claims/{id}/revoke BODY {name: "username", password: "292"}
ichain.revokeClaim(claim)
```

## Asset 

```js
var ichain = require("ichain")

// Create new asset 

var createAssetBody = {
  account_name: "demo",
  password: "demo",
  asset_id: "string",
  asset_name: "string",
  asset_quantity: "string"
}

// POST /assets BODY createAssetBody
ichain.createAsset(assetID, name, quantity)


var updateAttributeBody = {
  account_name: "demo",
  password: "demo",
  asset_id: "assetID",
  attribute_name: "weight",
  attribute_value: 400,
  attribute_type: "int"
}

// update attribute
// POST /assets/update-attribute BODY updateAttributeBody
ichain.updateAssetAttribute(assetID, name, type, value)


// GET /assets/{id}
ichain.getAsset(assetID)


// POST /assets/{id}/add-quantity {..accountInfo, quantity: 100}
ichain.addAssetQuantity(assetID, quantity)


// POST /assets/{id}/subtract-quantity {..accountInfo, quantity: 100}
ichain.subtractAssetQuantity(assetID, quantity)

// POST /assets/{id}/transfer {..accountInfo, quantity: 100, to: "address"}
ichain.transferAsset(assetID, quantity, to)

```
