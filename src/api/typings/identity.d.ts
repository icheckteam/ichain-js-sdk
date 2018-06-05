import { MsgCreateClaim, MsgRevokeClaim } from "../../messages";

interface identityOpts {
  net?: string
  privateKey?: string

  claim: MsgCreateClaim
  revokeClaim: MsgRevokeClaim
}

export function createClaim(opts: identityOpts): Promise<Response>
export function revokeClaim(opts: identityOpts): Promise<Response>