import axios from 'axios'
import logger from '../logging'
import { signMsg } from '../keys/msg'
import Key from '../keys/key'
import base64 from 'base-64'
import { networks } from '../settings'
import { serializeTx } from '../transactions/core';
import { getAPIEndpoint } from './core';
import MsgCreateAsset from '../messages/create-asset';
import MsgAddQuantity from '../messages/add-quantity';
import MsgSubtractQuantity from '../messages/subtract-quantity';
import MsgCreateProposal from '../messages/msg-create-proposal';
import MsgAnswerProposal from '../messages/msg-answer-proposal';
import MsgRevokeProposal from '../messages/msg-revoke-proposal';
import MsgUpdateAttributes from '../messages/update-attributes';
const log = logger('api')


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
    msg: tx.msg,
    signatures: [signature],
  }
  const url = `${endpoint}/accounts/${fromAcct.address}/send`;
  return axios.post(url, body);
}

/**
 * create new an asset
 * @param {object} opts 
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgCreateAsset} opt.asset
 * @return {Promise<Response>} RPC Response
 */
export const createAsset = (opts) => {
  const endpoint = getAPIEndpoint(opts.net);
  var tx = {
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.asset,
  }
  const signature = signMsg(serializeTx(tx), opts.privateKey)
  const body = {
    msg: opts.asset,
    signatures: [signature],
  }
  return axios.post(`${endpoint}/assets`, body);
}


/**
 * create new an asset
 * @param {string} net 
 * @param {string} assetId the id of the asset
 * @return {Promise<Response>} RPC Response
 */
export const getAsset = (net, assetId) => {
  const endpoint = getAPIEndpoint(net);
  return axios.get(`${endpoint}/assets/${assetId}`);
}


/**
 * add quantity for the asset
 * @param {object} opts 
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgAddQuantity} opts.addQuantity 
 * @return {Promise<Response>} RPC Response
 */
export const addQuantity = (opts) => {
  const endpoint = getAPIEndpoint(opts.net);
  var tx = {
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.addQuantity,
  }
  const signature = signMsg(serializeTx(tx), opts.privateKey)
  const body = {
    msg: opts.addQuantity,
    signatures: [signature],
  }
  const url = `${endpoint}/assets/${opts.addQuantity.id}/add-quantity`;
  return axios.post(url, body);
}

/**
 * subtract quantity
 * @param {object} opts 
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgSubtractQuantity} opts.subtractQuantity 
 * @return {Promise<Response>} RPC Response
 */
export const subtractQuantity = (opts ) => {
  const endpoint = getAPIEndpoint(opts.net);
  var tx = {
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.subtractQuantity,
  }
  const signature = signMsg(serializeTx(tx), opts.privateKey)
  const body = {
    msg: opts.subtractQuantity,
    signature: [signature],
  }
  const url = `${endpoint}/assets/${opts.subtractQuantity.id}/subtract-quantity`
  
  return axios.post(url, body);
}


/**
 * create proposal
 * @param {object} opts 
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgCreateProposal} opts.proposal 
 * @return {Promise<Response>} RPC Response
 */
export const createProposal = (opts) => {
  const endpoint = getAPIEndpoint(opts.net);
  var tx = {
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.proposal,
  }
  const signature = signMsg(serializeTx(tx), opts.privateKey)
  const body = {
   msg: opts.proposal,
   signatures: [signature]
  }
  const url = `${endpoint}/assets/${opts.proposal.asset_id}/create-proposal`
  return axios.post(url, body);
}

/**
 * answer proposal
 * @param {object} opts 
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgAnswerProposal} opts.answerProposal 
 * @return {Promise<Response>} RPC Response
 */
export const answerProposal = (opts ) => {
  const endpoint = getAPIEndpoint(opts.net);
  var tx = {
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.answerProposal
  }
  const signature = signMsg(serializeTx(tx), opts.privateKey)
  const body = {
    msg: opts.answerProposal,
    signatures: [signature]
  }
  const url = `${endpoint}/assets/${opts.answerProposal.asset_id}/answer-proposal`
  
  return axios.post(url, body);
}


/**
 * revoke proposal
 * @param {object} opts 
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgRevokeProposal} opts.revokeProposal 
 * @return {Promise<Response>} RPC Response
 */
export const revokeProposal = (opts ) => {
  const endpoint = getAPIEndpoint(opts.net);
  var tx = {
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.revokeProposal,
  }
  const signature = signMsg(serializeTx(tx), opts.privateKey)
  const body = {
    msg: opts.revokeProposal,
    signatures: [signature]
  }
  const url =`${endpoint}/assets/${opts.revokeProposal.asset_id}/revoke-proposal`
  return axios.post(url, body);
}



/**
 * update attributes
 * @param {object} opts 
 * @param {string} opts.net 
 * @param {string} opts.privateKey 
 * @param {number} opts.sequence
 * @param {string} opts.chainId
 * @param {MsgUpdateAttributes} opts.updateAttributes 
 * @return {Promise<Response>} RPC Response
 */
export const updateAttributes = (opts ) => {
  const endpoint = getAPIEndpoint(opts.net);
  var tx = {
    chain_id: opts.chainId,
    sequences: [opts.sequence],
    msg: opts.updateAttributes,
  }
  const signature = signMsg(serializeTx(tx), opts.privateKey)
  const body = {
    msg: opts.updateAttributes,
    signatures: [signature]
  }
  const url = `${endpoint}/assets/${opts.updateAttributes.id}/update-attribute`
  return axios.post(url, body);
}


/**
 * get history
 * @param {string} net 
 * @param {string} assetId 
 * @param {string} attributeName
 * @return {Promise<Response>} RPC Response
 */
export const getHistory = (net, assetId, attributeName ) => {
  const url = `${getAPIEndpoint(net)}/assets/${assetId}/history/${attributeName}`
  return axios.get(url);
}


/**
 * get materials
 * @param {string} net 
 * @param {string} assetId 
 * @param {string} attributeName
 * @return {Promise<Response>} RPC Response
 */
export const getMaterials = (net, assetId ) => {
  const url = `${getAPIEndpoint(net)}/assets/${assetId}/materials`
  return axios.get(url);
}