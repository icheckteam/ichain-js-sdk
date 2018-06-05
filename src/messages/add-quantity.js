import Material from './material'
/**
 * @class MsgAddQuantity
 */
export default class MsgAddQuantity {
  constructor(tx = {}) {
    /** @type {string} */
    this.issuer =  tx.address.toUpperCase()
     /** @type {string} */
    this.id =tx.id
     /** @type {number} */
    this.quantity = tx.quantity
     /** @type {Material[]} */
    this.materials = tx.materials
  }
}