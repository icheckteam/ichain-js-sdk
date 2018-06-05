import { MsgUnbound, MsgDelegate } from "../../messages";

interface stakeoptions {
  net?: string
  privateKey?: string

  delegate?: MsgDelegate
  unbond?: MsgUnbound
}

export function editDelegations(opts: stakeoptions): Promise<Response>