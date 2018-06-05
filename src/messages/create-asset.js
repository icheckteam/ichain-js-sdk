
/**
 * @class MsgCreateAsset
 */
class MsgCreateAsset {
  constructor(tx = {}) {
    /** @type {string} */
    this.issuer =  tx.address.toUpperCase()
     /** @type {string} */
    this.id =tx.id
     /** @type {number} */
    this.quantity = tx.quantity
     /** @type {string} */
    this.name =tx.name
     /** @type {string} */
    this.company = tx.company
     /** @type {string} */
    this.email = tx.email
  }
}

export default MsgCreateAsset