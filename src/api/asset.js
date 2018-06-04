import axios from 'axios'
import logger from '../logging'
import { signMsg } from '../keys/msg'
import Key from '../keys/key'
import base64 from 'base-64'
import { networks } from '../settings'
import { serializeTx } from '../transactions/core';
const log = logger('api')

/**
 * API Switch for MainNet and TestNet
 * @param {string} net - 'mainet', 'testnet', or custom ichain-db URL.
 * @return {string} URL of API endpoint.
 */
export const getAPIEndpoint = net => {
  if (networks[net]) return networks[net].extra.ichainDB
  return net
}

/**
 * Send an asset to an account 
 * @param {string} net - "mainnet" or "testnet"
 * @param {*} from - Private key of the sending address.
 * @param {*} to - the recipient address.
 * @param {*} assets the amount of each asset to send.
 * @return {Promise<Response>} RPC Response
 */
export const sendAsset = (net, from, to, assets) => {
  const fromAcct = new Key(from)
  const addr = fromAcct.address;
  const endpoint = getAPIEndpoint(net);
  assets = assets.map(asset => {
    return {denom: asset.assetId, amount: asset.amount}
  })
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      inputs: [
        { address: addr.toUpperCase(), coins: assets}
      ],
      outputs: [
        { address: to.toUpperCase(), coins: assets}
      ] 
    },
  }
  const signature = signMsg(serializeTx(tx), from)

  const body = {
    chain_id: tx.chain_id,
    sequence: tx.sequences[0],
    amount: assets,
    from: fromAcct.address,
    signature: signature,
  }
  return axios.post(`${endpoint}/accounts/${fromAcct.address}/send`, body);
}


