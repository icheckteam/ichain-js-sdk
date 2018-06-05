/**
 * @class MsgAddQuantity
 */
export default class MsgSubtractQuantity {
  constructor(tx = {}) {
    /** @type {string} */
    this.issuer =  tx.address.toUpperCase()
     /** @type {string} */
    this.id =tx.id
     /** @type {number} */
    this.quantity = tx.quantity
  }
}