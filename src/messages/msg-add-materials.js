import Material from './material'
/**
 * @class MsgAnswerProposal
 */
export default class MsgAddMaterials {
  constructor(tx = {}) {
    /** @type {string} */
    this.asset_id =  tx.asset_id
    /** @type {string} */
    this.issuer = tx.issuer
    /** @type {Material[]} */
    this.materials = tx.materials
  }
}

