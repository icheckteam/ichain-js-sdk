import base64 from 'base-64'


/**
 * Serializes a given Tx object
 * @param {Tx} tx
 * @returns {string} Hexstring of Tx
 */
export const serializeTx = (tx) => {
  return JSON.stringify({
    chain_id: tx.chain_id,
    sequences: tx.sequences,
    fee_bytes: base64.encode(tx.fee || {
      amount: [],
      gas: 0,
    }),
    msg_bytes: base64.encode(tx.msg),
    alt_bytes: null,
  })
}