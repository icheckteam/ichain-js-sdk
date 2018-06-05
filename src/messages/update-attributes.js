
/**
 * @class MsgUpdateAttributes
 */
export default class MsgUpdateAttributes {
  constructor(tx = {}) {
    /** @type {string} */
    this.issuer =  tx.address.toUpperCase()
     /** @type {string} */
    this.id =tx.id
     /** @type {Attribute[]} */
    this.attributes = tx.attributes
  }
}