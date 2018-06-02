import { Key } from "./keys"
export const DEFAULT_SCRYPT: {
  cost: number
  blockSize: number
  parallel: number
  size: number
}

export const DEFAULT_WALLET: {
  name: string,
  version: string,
  accounts: Key[],
}
