
/**
 * @class ClaimMetadata
 */
class ClaimMetadata {
  constructor(tx = {}) {
    /** @type {date} */
    this.create_time = tx.create_time
    /** @type {string} */
    this.issuer = tx.issuer
    /** @type {string} */
    this.recipient = tx.recipient
    /** @type {date} */
    this.expires = tx.expires
    /** @type {revocation} */
    this.revocation = tx.revocation
  }
}

export default ClaimMetadata