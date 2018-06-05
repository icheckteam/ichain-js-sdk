import { networks } from '../settings'
/**
 * API Switch for MainNet and TestNet
 * @param {string} net - 'mainet', 'testnet', or custom ichain-db URL.
 * @return {string} URL of API endpoint.
 */
export const getAPIEndpoint = net => {
  if (networks[net]) return networks[net].extra.ichainDB
  return net
}
