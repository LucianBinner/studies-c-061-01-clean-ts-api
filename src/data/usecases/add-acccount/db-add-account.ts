import { AccountModel, AddAccount, Encrypter, AddAccountModel } from './db-add-account-protocols';

export class DbAddAccount implements AddAccount { 
    private readonly encrypter: Encrypter

    constructor (encrypter: Encrypter) {
        this.encrypter = encrypter
    }
    async add(account: AddAccountModel): Promise<AccountModel | null> {
        this.encrypter.encrypt(account.password)
        
        return new Promise(resolve => resolve(null))
    }
}