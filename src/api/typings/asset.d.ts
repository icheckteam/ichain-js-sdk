import { MsgCreateAsset, MsgAddQuantity, MsgSubtractQuantity, MsgUpdateAttribute, MsgCreateProposal, MsgAnswerProposal } from "../../messages";


export interface AssetAmount {
  amount: number
  assetId: string
}

export interface Asset {
  id: string
  name: string
  issuer: string
  quantity: string
  company: string
  email: string
  materials: Array<Material>
}

export interface Material {
  amount: number
  assetId: string
}

export interface Attribute {
  type: number
  string_value: string
  boolean_value: boolean
  location_value: Location
  enum_value:  Array<string>
}

export interface Location {
  latitude: number
  longitude: number
}

export interface Proposal {
  assetId: string
  recipient: string,
  propertipes: Array<string>
  role: number
}

export interface AnswerProposal {
  assetId: string
  recipient: string,
  response: number
}

export interface RevokeProposal {
  assetId: string
  recipient: string,
  propertipes: Array<string>
}

export interface AddQuantity {
  assetId: string
  quantity: number
  materials: Array<Material>
}

export interface Options {
  net?: string
  privateKey?: string

  asset?: MsgCreateAsset
  addQuantity?: MsgAddQuantity
  subtractQuantity?: MsgSubtractQuantity
  updateAttributes?: MsgUpdateAttribute
  proposal?: MsgCreateProposal
  answerProposal: MsgAnswerProposal,
  revokeProposal: RevokeProposal
}


// asset ...
export function sendAsset(net: string, from: string, to: string, assets: Array<AssetAmount>): Promise<Response>
export function createAsset(opts: Options): Promise<Response>
export function addQuantity(opts: Options): Promise<Response>
export function subtractQuantity(opts: Options): Promise<Response>
export function updateAttributes(opts: Options): Promise<Response>

// proposal ...
export function createProposal(opts: Options): Promise<Response>
export function answerProposal(opts: Options): Promise<Response>
export function revokeProposal(opts: Options): Promise<Response>