
/**
 * @class MsgDelegate
 */
class MsgDelegate {
  constructor(tx = {}) {
    /** @type {string} */
    this.delegator_addr = tx.delegator_addr
    /** @type {string} */
    this.validator_addr = tx.validator_addr
    /** @type {Coin} */
    this.bond = tx.bond
  }
}

export default MsgDelegate