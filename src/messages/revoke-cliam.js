

/**
 * @class MsgRevokeClaim
 */
class MsgRevokeClaim {
  constructor(tx = {}) {
    /** @type {string} */
    this.claim_id = tx.claim_id
    /** @type {string} */
    this.owner = tx.owner
    /** @type {string} */
    this.revocation = tx.revocation
  }
}

export default MsgRevokeClaim