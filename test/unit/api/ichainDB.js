import {doSendAsset} from '../../../src/api/ichainDB'
describe('ichainDB method', function () {
  const privateKey = "a96e62ed3955e65be32703f12d87b6b5cf26039ecfa948dc5107a495418e5330";
  const addr = "7f4e9e56c8ecadeeb838bcaa691e3c741abfcc39";
  it('doSendAsset', () => {
    doSendAsset("mainet", privateKey, addr, [
      { assetId: "1", amount: 100 },
    ])
  })
})