

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

// asset ...
export function sendAsset(net: string, from: string, to: string, assets: Array<AssetAmount>): Promise<Response>
export function createAsset(net: string, issuer: string, asset: Asset): Promise<Response>
export function addQuantity(net: string, issuer: string, opts: AddQuantity): Promise<Response>
export function subtractQuantity(net: string, issuer: string, assetId: string, quantity: number): Promise<Response>
export function updateAttributes(net: string, issuer: string, assetId: string, attributes: Array<Attribute>): Promise<Response>

// proposal ...
export function createProposal(net: string, issuer: string, opts: Proposal): Promise<Response>
export function answerProposal(net: string, issuer: string, opts: AnswerProposal): Promise<Response>
export function revokeProposal(net: string, issuer: string, opts: RevokeProposal): Promise<Response>