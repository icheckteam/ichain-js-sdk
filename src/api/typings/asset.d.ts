import { MsgCreateAsset, MsgAddQuantity, MsgSubtractQuantity, MsgUpdateAttribute, MsgCreateProposal, MsgAnswerProposal, MsgRevokeProposal } from "../../messages";


interface AssetAmount {
  amount: number
  assetId: string
}


interface apiAssetoptions {
  net?: string
  privateKey?: string

  asset?: MsgCreateAsset
  addQuantity?: MsgAddQuantity
  subtractQuantity?: MsgSubtractQuantity
  updateAttributes?: MsgUpdateAttribute
  proposal?: MsgCreateProposal
  answerProposal: MsgAnswerProposal,
  revokeProposal: MsgRevokeProposal
}


// asset ...
export function sendAsset(net: string, from: string, to: string, assets: Array<AssetAmount>): Promise<Response>
export function createAsset(opts: apiAssetoptions): Promise<Response>
export function addQuantity(opts: apiAssetoptions): Promise<Response>
export function subtractQuantity(opts: apiAssetoptions): Promise<Response>
export function updateAttributes(opts: apiAssetoptions): Promise<Response>

// proposal ...
export function createProposal(opts: apiAssetoptions): Promise<Response>
export function answerProposal(opts: apiAssetoptions): Promise<Response>
export function revokeProposal(opts: apiAssetoptions): Promise<Response>