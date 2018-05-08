# ichain-js-sdk
Javascript SDK for the ichain core


## Identity
```
var ichain = require("ichain")

var claim = {
  id: "449595",
  content: {
    name: "Claim name"
  },
  metadata: {
    issuer: "59DC99940345934590359389BGGRGFGF",
    recipient: "59DC99940345934590359389BGGRGFGF",
    createTime: "2019-24-24",
    expires: "2019-24-24",
  }
}

// Create new claim 
ichain.claim.issue(claim)


// revoke claim
ichain.claim.revoke(claim)


```
