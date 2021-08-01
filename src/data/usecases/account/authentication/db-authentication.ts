import {
    Authentication,
    AuthenticationParams,
    HashComparer,
    Encrypter,
    UpdateAccessTokenRepository,
    LoadAccountByEmailRepository
} from "./db-authentication-protocols";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
        private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
    ) { }
    async auth(authentication: AuthenticationParams): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypter.encrypt(account.id)
                await this.updateAccessTokenRepositoryStub.updateAccessToken(account.id, accessToken)
                return accessToken
            }
        }
        return new Promise(resolve => resolve(null))
    }
}