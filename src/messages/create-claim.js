import ClaimMetadata from './claim-metadata'
/**
 * @class MsgCreateClaim
 */
class MsgCreateClaim {
  constructor(tx = {}) {
    /** @type {string} */
    this.id = tx.id
    /** @type {string} */
    this.context = tx.context
    /** @type {string} */
    this.content = tx.content
    /** @type {ClaimMetadata} */
    this.metadata = tx.metadata
  }
}

export default MsgCreateClaim