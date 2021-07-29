import { LoadAccountByToken } from "../../../domain/usecases/load-account-by-token";
import { Decrypter } from "../../protocols/criptography/decrypter";
import { LoadAccountByTokenRepository } from "../../protocols/db/account/load-account-by-token-repository copy";
import { AccountModel } from "../add-acccount/db-add-account-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }
  async load(accessToken: string, role?: string): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if(token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }
    return null
  }
}