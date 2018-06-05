
/**
 * @class MsgUnbond
 */
class MsgUnbond {
  constructor(tx = {}) {
    /** @type {string} */
    this.delegator_addr = tx.delegator_addr
    /** @type {string} */
    this.validator_addr = tx.validator_addr
    /** @type {string} */
    this.shares = tx.bond
  }
}

export default MsgUnbond