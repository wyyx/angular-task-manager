export interface User {
  id?: string
  email: string
  password: string
  name: string
  avatar: string
  projectIds: string[]
  address: Address
  certificate: Certificate
}

export interface Certificate {
  certificateType: CertificateType
  certificateNum: string
}

export enum CertificateType {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}

export interface Address {
  id?: number
  province: string
  city: string
  district: string
  street?: string
}
