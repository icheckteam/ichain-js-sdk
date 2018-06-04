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

/**
 * create new an asset
 * @param {string} net 
 * @param {string} issuer the private key of the issuer
 * @param {options} opts 
 * @param {string} opts.id the id of the asset
 * @param {string} opts.name the name of the asset
 * @param {string} opts.company the company name 
 * @param {string} opts.email the email of company
 * @param {number} opts.quantity
 */
export const createAsset = (net, issuer, opts) => {
  const endpoint = getAPIEndpoint(net);
  const issuerAcc = new Key(issuer)
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      issuer: issuerAcc.address.toUpperCase(),
      id: opts.id,
      name: opts.name,
      company: opts.company,
      email: opts.email,
    },
  }
  const signature = signMsg(serializeTx(tx), issuerAcc.privateKey)
  const body = {
    chain_id: "test",
    sequences: [0],
    issuer: issuerAcc.address.toUpperCase(),
    asset_id: opts.id,
    name: opts.name,
    company: opts.company,
    email: opts.email,
    signature: signature,
  }
  return axios.post(`${endpoint}/assets`, body);
}


/**
 * create new an asset
 * @param {string} net 
 * @param {string} assetId the id of the asset
 */
export const getAsset = (net, assetId) => {
  const endpoint = getAPIEndpoint(net);
  return axios.post(`${endpoint}/assets/${assetId}`, body);
}


/**
 * add quantity for the asset
 * @param {string} net 
 * @param {string} issuer the private key of the issuer
 * @param {object} opts 
 * @param {string} opts.assetId
 * @param {array}  opts.materials the list material of the asset
 * @param {number} opts.quantity 
 */
export const addQuantity = (net, issuer, opts) => {
  const endpoint = getAPIEndpoint(net);
  const issuerAcc = new Key(issuer)
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      issuer: issuerAcc.address.toUpperCase(),
      id: opts.assetId,
      quantity: opts.quantity,
      materials: opts.materials,
    },
  }
  const signature = signMsg(serializeTx(tx), issuerAcc.privateKey)
  const body = {
    chain_id: "test",
    sequences: [0],
    issuer: issuerAcc.address.toUpperCase(),
    quantity: opts.quantity,
    assetId: opts.assetId,
    materials: opts.materials,
    signature: signature,
  }
  const url = `${endpoint}/assets/${opts.assetId}/add-quantity`;
  return axios.post(url, body);
}

/**
 * subtract quantity
 * @param {string} net 
 * @param {string} issuer the private key of the issuer
 * @param {string} assetId the id of the asset
 * @param {number} quantity the quantity to subtract
 */
export const subtractQuantity = (net, issuer, assetId, quantity ) => {
  const endpoint = getAPIEndpoint(net);
  const issuerAcc = new Key(issuer)
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      issuer: issuerAcc.address.toUpperCase(),
      id: assetId,
      quantity: quantity,
    },
  }
  const signature = signMsg(serializeTx(tx), issuerAcc.privateKey)
  const body = {
    chain_id: "test",
    sequences: [0],
    issuer: issuerAcc.address.toUpperCase(),
    quantity: quantity,
    assetId: assetId,
    signature: signature,
  }
  const url = `${endpoint}/assets/${assetId}/subtract-quantity`
  return axios.post(url, body);
}


/**
 * create proposal
 * @param {string} net 
 * @param {string} issuer the private key of the issuer
 * @param {object} opts 
 * @param {string} opts.assetId 
 * @param {string} opts.recipient
 * @param {array} opts.propertipes
 * @param {role} opts.role
 */
export const createProposal = (net, issuer, opts ) => {
  const endpoint = getAPIEndpoint(net);
  const issuerAcc = new Key(issuer)
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      asset_id: opts.assetId,
      issuer: issuerAcc.address.toUpperCase(),
      recipient: opts.recipient,
      propertipes: opts.propertipes,
      role: opts.role,
    },
  }
  const signature = signMsg(serializeTx(tx), issuer)
  const body = {
    chain_id: "test",
    sequences: [0],

    asset_id: opts.assetId,
    issuer: issuerAcc.address.toUpperCase(),
    recipient: opts.recipient,
    propertipes: opts.propertipes,
    role: opts.role,
    signature: signature
  }
  const url = `${endpoint}/assets/${opts.assetId}/create-proposal`
  return axios.post(url, body);
}

/**
 * answer proposal
 * @param {string} net 
 * @param {string} issuer the private key of the issuer
 * @param {object} opts 
 * @param {string} opts.assetId 
 * @param {string} opts.recipient
 * @param {number} opts.response
 */
export const answerProposal = (net, issuer, opts ) => {
  const endpoint = getAPIEndpoint(net);
  const issuerAcc = new Key(issuer)
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      asset_id: opts.assetId,
      recipient: issuerAcc.address.toUpperCase(),
      response: opts.response,
    },
  }
  const signature = signMsg(serializeTx(tx), issuer)
  const body = {
    chain_id: "test",
    sequences: [0],

    asset_id: opts.assetId,
    recipient: issuerAcc.address.toUpperCase(),
    response: opts.response,

    signature: signature
  }
  const url = `${endpoint}/assets/${opts.assetId}/answer-proposal`
  return axios.post(url, body);
}


/**
 * revoke proposal
 * @param {string} net 
 * @param {string} issuer the private key of the issuer
 * @param {object} opts 
 * @param {string} opts.assetId 
 * @param {string} opts.recipient
 * @param {array} opts.propertipes
 */
export const revokeProposal = (net, issuer, opts ) => {
  const endpoint = getAPIEndpoint(net);
  const issuerAcc = new Key(issuer)
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      asset_id: opts.assetId,
      issuer: issuerAcc.address.toUpperCase(),
      recipient: opts.recipient,
      response: opts.response,
    },
  }
  const signature = signMsg(serializeTx(tx), issuerAcc.privateKey)
  const body = {
    chain_id: "test",
    sequences: [0],

    asset_id: opts.assetId,
    issuer: issuerAcc.address.toUpperCase(),
    recipient: opts.recipient,
    response: opts.response,
    
    signature: signature
  }
  const url =`${endpoint}/assets/${opts.assetId}/revoke-proposal`
  return axios.post(url, body);
}



/**
 * update attributes
 * @param {string} net 
 * @param {string} issuer the private key of the issuer
 * @param {string} assetId the id of the asset
 * @param {array} attributes 
 */
export const updateAttributes = (net, issuer, assetId, attributes ) => {
  const endpoint = getAPIEndpoint(net);
  const issuerAcc = new Key(issuer)
  var tx = {
    chain_id: "test",
    sequences: [0],
    msg: {
      issuer: issuerAcc.address.toUpperCase(),
      id: assetId,
      attributes: attributes,
    },
  }
  const signature = signMsg(serializeTx(tx), issuerAcc.privateKey)
  const body = {
    chain_id: "test",
    sequences: [0],

    issuer: issuerAcc.address.toUpperCase(),
    asset_id: assetId,
    attributes: attributes,
    
    signature: signature
  }
  const url = `${endpoint}/assets/${assetId}/update-attribute`
  return axios.post(url, body);
}