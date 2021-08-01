import { AuthenticationParams } from "@/data/usecases/account/authentication/db-authentication-protocols"
import { AccountModel } from "@/domain/models/account"
import { AddAccountParams } from "@/domain/usecases/account/add-account"

export const mockAccountModel = (): AccountModel =>
  Object.assign({}, mockAddAccountParams(), { id: 'any_id' })
  
export const mockAddAccountWithTokenAndRoleParams = () =>
Object.assign({}, mockAddAccountWithTokenParams(), { role: 'admin' })

export const mockAddAccountWithTokenParams = () =>
  Object.assign({}, mockAddAccountParams(), { accessToken: 'any_token' })

export const mockAddAccountParams = (): AddAccountParams =>
  Object.assign({}, mockAuthentication(), { name: 'any_name' })

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})