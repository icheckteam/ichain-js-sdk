/**
 * @class MsgCreateProposal
 */
export default class MsgCreateProposal {
  constructor(tx = {}) {
    /** @type {string} */
    this.asset_id =  tx.asset_id
    /** @type {string} */
    this.issuer =tx.issuer
    /** @type {string} */
    this.recipient = tx.recipient
    /** @type {[]string} */
    this.propertipes = tx.propertipes
    /** @type {number} */
    this.role = tx.role
  }
}