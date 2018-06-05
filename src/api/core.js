import base64 from 'base-64'
import { networks } from '../settings'

/**
 * Serializes a given Tx object
 * @param {Tx} tx
 * @returns {string} Hexstring of Tx
 */
export const serializeTx = (tx) => {
  return JSON.stringify({
    chain_id: tx.chain_id,
    sequences: tx.sequences,
    fee_bytes: base64.encode(JSON.stringify(tx.fee || {
      amount: [],
      gas: 0,
    })),
    msg_bytes: base64.encode(JSON.stringify(tx.msg)),
    alt_bytes: null,
  })
}

/**
 * API Switch for MainNet and TestNet
 * @param {string} net - 'mainet', 'testnet', or custom ichain-db URL.
 * @return {string} URL of API endpoint.
 */
export const getAPIEndpoint = net => {
  if (networks[net]) return networks[net].extra.ichainDB
  return net
}
