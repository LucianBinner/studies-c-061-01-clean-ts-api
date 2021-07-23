import { AccountModel } from "../usecases/add-acccount/db-add-account-protocols";

export interface LoadAccountByEmailRepository {
    load(email: string): Promise<AccountModel>
}