"use strict"

const axios = require("axios")

// returns an async function which makes a request for the given
// HTTP method (GET/POST/DELETE/etc) and path (/foo/bar)
function req(method, path) {
  return function(data) {
    return this.request(method, path, data)
  }
}

// returns an async function which makes a request for the given
// HTTP method and path, which accepts arguments to be appended
// to the path (/foo/{arg}/...)
function argReq(method, prefix, suffix = "") {
  return function(args, data) {
    // `args` can either be a single value or an array
    if (Array.isArray(args)) {
      args = args.join("/")
    }
    if (method === "DELETE") {
      data = { data }
    }
    return this.request(method, `${prefix}/${args}${suffix}`, data)
  }
}

class Client {
  constructor(server = "http://localhost:8998") {
    this.server = server
  }

  request(method, path, data) {
    return axios[method.toLowerCase()](this.server + path, data)
      .then(res => res.data)
      .catch(err => {
        if (!resError.response || !resError.response.data) {
          throw resError
        }
        let data = resError.response.data
        // server responded with error message, create an Error from that
        let error = Error(data.error)
        error.code = data.code
        return err
      });
  }
}

let fetchAccount = argReq("GET", "/accounts")

Object.assign(Client.prototype, {
  // meta
  lcdConnected: function() {
    return this.listKeys().then(() => true, () => false)
  },

  // tx
  sign: req("POST", "/sign"),
  postTx: req("POST", "/tx"),

  // keys
  generateSeed: req("GET", "/keys/seed"),
  listKeys: req("GET", "/keys"),
  storeKey: req("POST", "/keys"),
  getKey: argReq("GET", "/keys"),
  updateKey: argReq("PUT", "/keys"),
  // axios handles DELETE requests different then other requests, we have to but the body in a config object with the prop data
  deleteKey: argReq("DELETE", "/keys"),

  // coins
  send: argReq("POST", "/accounts", "/send"),
  ibcSend: argReq("POST", "/ibc", "/send"),
  queryAccount(address) {
    return fetchAccount
      .call(this, address)
      .then(res => {
        return res.value
      })
      .catch(err => {
        console.log("err")
        // if account not found, return null instead of throwing
        if (err.message.includes("account bytes are empty")) {
          return null
        }
        throw err
      })
  },
  coinTxs: argReq("GET", "/tx/coin"),

  txs: argReq("GET", "/txs"),

  // staking
  candidate: argReq("GET", "/query/stake/candidate"),
  candidates: req("GET", "/query/stake/candidates"),
  buildDelegate: req("POST", "/build/stake/delegate"),
  buildUnbond: req("POST", "/build/stake/unbond"),
  bondingsByDelegator: argReq("GET", "/query/stake/delegator")
})

module.exports = Client