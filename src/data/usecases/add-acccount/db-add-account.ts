import {
    AccountModel,
    AddAccount,
    Hasher,
    AddAccountModel,
    AddAccountRepository
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository
    ) { }
    async add(accountData: AddAccountModel): Promise<AccountModel | null> {
        const hashedPassword = await this.hasher.hash(accountData.password)
        const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
        return account
    }
}