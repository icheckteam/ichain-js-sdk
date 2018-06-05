

export default class Material {
  constructor(tx = {}){
    /** @type {string} */
    this.asset_id =  tx.asset_id
    /** @type {string} */
    this.quantity = tx.quantity
  }
}