import axios from 'axios'
import logger from '../logging'
import { signMsg } from '../keys/msg'
import Key from '../keys/key'
import base64 from 'base-64'
const log = logger('api')
export const name = 'neonDB'


/**
 * Send an asset to an account 
 * @param {string} net - "mainnet" or "testnet"
 * @param {*} from - Private key of the sending address.
 * @param {*} to - the recipient address.
 * @param {*} assets the amount of each asset to send.
 * @param {function} [signingFunction] - Optional signing function. Used for external signing.
 * @return {Promise<Response>} RPC Response
 */
export const doSendAsset = (net, from, to, coins, signingFunction) => {
  const fromAcct = new Key(from)
  coins = [{denom: "atom", amount: 150}]
  let fee = {
    amount: coins,
    gas: 100,
  }
  var msg = {
    chain_id: "test",
    sequences: [0],
    fee_bytes: base64.encode(JSON.stringify(fee)),
    msg_bytes: base64.encode(JSON.stringify( {
      inputs: [
        { address: fromAcct.address.toUpperCase(), coins: coins}
      ],
      outputs: [
        { address: fromAcct.address.toUpperCase(), coins: coins}
      ]
    })),
    alt_bytes: null,
  }

  const signature = signMsg(JSON.stringify(msg), from)
  console.log(signature);
}