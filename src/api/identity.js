import axios from 'axios'
import MsgCreateClaim from "../messages/create-claim";
import MsgRevokeClaim from "../messages/revoke-cliam";
import { getAPIEndpoint, serializeTx } from "./core";
import { signMsg } from "../keys/msg";

/**
 * create claim
 * 
 * @param {object} opts
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgCreateClaim[]} opts.claim
 * @return {Promise<Response>}
 */
export const createClaim  = (opts) => {
  const endpoint = getAPIEndpoint(opts.net)

  const signature = signMsg(serializeTx({
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.claim,
  }), opts.privateKey)

  const  body = {
    msg: opts.claim,
    signatures: [signature],
  }
  const url = `${endpoint}/claims`;
  return axios.post(url, body);
}



/**
 * revoke claim
 * 
 * @param {object} opts
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgRevokeClaim[]} opts.revokeClaim
 * @return {Promise<Response>}
 */
export const revokeClaim  = (opts) => {
  const endpoint = getAPIEndpoint(opts.net)

  const signature = signMsg(serializeTx({
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.revokeClaim,
  }), opts.privateKey)

  const  body = {
    msg: opts.revokeClaim,
    signatures: [signature],
  }
  const url = `${endpoint}/claims/${opts.revokeClaim.claim_id}`;
  return axios.post(url, body);
}