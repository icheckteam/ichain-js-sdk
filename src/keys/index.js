import nacl from 'tweetnacl'
import naclutil from 'tweetnacl-util'
import CryptoJS from 'crypto-js'
import * as utils from '../utils'
import * as core from './core'

export const create = (data) => {
  var info = new Info(core.generatePrivateKey());
  console.log(info.sign("43243"))
  return info;
}


function Info(priv) {
  this.priv = priv;
  this.pub = core.getPublicKeyFromPrivateKey(priv);
  this.address = core.getAddressFromPublicKey(this.pub)

  this.sign = (tx) => {
    return core.generateSignature(tx, this.priv)
  }
}




function address(pubkey)  {
  return CryptoJS.RIPEMD160(CryptoJS.SHA256(pubkey)).toString()
}

