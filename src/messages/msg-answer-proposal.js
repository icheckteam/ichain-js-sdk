/**
 * @class MsgAnswerProposal
 */
export default class MsgAnswerProposal {
  constructor(tx = {}) {
    /** @type {string} */
    this.asset_id =  tx.asset_id
    /** @type {string} */
    this.recipient = tx.recipient
    /** @type {number} */
    this.response = tx.response
  }
}