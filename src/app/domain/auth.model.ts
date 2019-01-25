import { User } from '../auth/models/user.model'
import { Error } from './error.model'

export interface Auth {
  user?: User
  userId?: string
  err?: Error
  token?: string
}
