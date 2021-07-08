import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string)
    })

    afterAll(async () => {
        await MongoHelper.disconect()
    })

    beforeEach(async () => {
        const accountCollection = MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    const makeSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }

    test('Should return an account on success', async () => {
        const sut = makeSut()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password'
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toEqual('any_name')
        expect(account.email).toEqual('any_email@mail.com')
        expect(account.password).toEqual('any_password')
    })
})