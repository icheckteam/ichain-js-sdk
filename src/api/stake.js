import axios from 'axios'
import { MsgDelegate, MsgUnbond } from "../messages";
import { getAPIEndpoint } from "./core";
import { signMsg } from "../keys/msg";
import { serializeTx } from "../transactions/core";

/**
 * edit delegations
 * 
 * @param {object} opts
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgDelegate[]} opts.delegate
 * @param {MsgUnbond} opts.unbond
 * @return {Promise<Response>}
 */
export const editDelegations  = (opts) => {
  const endpoint = getAPIEndpoint(opts.net)

  let messages = [];

  for(let msg of opts.delegate) {
    messages.push(msg)
  }

  for(let msg of opts.unbond) {
    messages.push(msg)
  }

  let signatures = []
  for (let msg of messages) {
    const signature = signMsg(serializeTx({
      chain_id: "test",
      sequences: [0],
      msg,
    }), opts.privateKey)
    opts.sequence++;
    signatures.push(signature)
  }
  const  body = {
    delegate: opts.delegate,
    unbond: opts.unbond,
    signatures: signatures,
  }
  const url = `${endpoint}/stake/delegations`;
  return axios.post(url, body);
}