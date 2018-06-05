
export interface MsgCreateAsset {
  issuer: string
  id: string,
  name: number
  quantity: number
  email: string 
  company: string
}


export interface MsgAddQuantity {
  issuer: string
  id: string,
  quantity: number,
  materials: Material[]
}


export interface MsgSubtractQuantity {
  issuer: string
  id: string,
  quantity: number,
}



export interface Material {
  asset_id: string 
  quantity: string
}




export interface MsgCreateProposal {
  asset_id: string 
  issuer: string
  recipient: string 
  propertipes: string[]
  role: number
}


export interface MsgAnswerProposal {
  asset_id: string 
  recipient: string 
  response: boolean
}

export interface MsgRevokeProposal {
  asset_id: string 
  issuer: string
  recipient: string 
  propertipes: string[]
}


export interface MsgDelegate {
  delegator_addr: string 
  validator_addr: string
  bond: any 
}

export interface MsgUnbound {
  delegator_addr: string 
  validator_addr: string
  shares: string 
}

export interface Attribute {
  name: string 
  type: number
  bytes_value: BufferSource,
  string_value: string
  enum_value: string[]
  location_value: Location[],
  boolean_value: boolean,
  number_value: number,

}


export interface Location {
  latitude: number
  longitude: string
}

export interface MsgUpdateAttribute {
  id: string 
  issuer: string 
  attributes: Attribute[]
}