import { networks } from '../settings'
import axios from 'axios'
/**
 * API Switch for mainet and testnet
 * @param {string} net - 'mainet', 'testnet', or custom ichain-db URL.
 * @return {string} URL of API endpoint.
 */
export const getAPIEndpoint = net => {
  if (networks[net]) return networks[net].extra.ichainDB
  return net
}

/**
 * get all assets
 * @param {string} net 
 * @param {string} addr 
 * @return {Promise<Response>} RPC Response
 */
export const getAssets = (net, addr) => {
  const endpoint = getAPIEndpoint(net);
  return axios.get(`${endpoint}/accounts/${addr.toUpperCase()}/assets`); 
}


/**
 * get account info
 * @param {string} net 
 * @param {string} addr 
 * @return {Promise<Response>} RPC Response
 */
export const getAccount = (net, addr) => {
  const endpoint = getAPIEndpoint(net);
  return axios.get(`${endpoint}/accounts/${addr.toUpperCase()}`); 
}

/**
 * get identities
 * @param {string} net 
 * @param {string} addr 
 * @return {Promise<Response>} RPC Response
 */
export const getIdentities = (net, addr) => {
  const endpoint = getAPIEndpoint(net);
  return axios.get(`${endpoint}/accounts/${addr.toUpperCase()}/identities`); 
}