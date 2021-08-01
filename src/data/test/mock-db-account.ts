import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository"
import { LoadAccountByTokenRepository } from "@/data/protocols/db/account/load-account-by-token-repository"
import { UpdateAccessTokenRepository } from "@/data/protocols/db/account/update-access-token-repository"
import { AccountModel } from "@/domain/models/account"
import { mockAccountModel } from "@/domain/test"
import { AddAccountParams } from "@/domain/usecases/account/add-account"

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
      async add(account: AddAccountParams): Promise<AccountModel> {
          return new Promise(resolve => resolve(mockAccountModel()))
      }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async loadByEmail(email: string): Promise<AccountModel | null> {
          return new Promise(resolve => resolve(mockAccountModel()))
      }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepository implements LoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenRepository()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepository implements UpdateAccessTokenRepository {
      async updateAccessToken (id: string, token: string): Promise<void> {
          return new Promise(resolve => resolve())
      }
  }
  return new UpdateAccessTokenRepository()
}