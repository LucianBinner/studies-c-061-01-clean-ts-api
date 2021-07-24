import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string)
    })

    afterAll(async () => {
        await MongoHelper.disconect()
    })

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    describe('POST /signup', () => { 
        test('Should return 200 on signup', async () => {
            await request(app)
                .post('/api/signup')
                .send({
                    name: 'Binner',
                    email: 'binner@email.com',
                    password: '123',
                    passwordConfirmation: '123'
                })
                .expect(200)
        })
    })

    describe('POST / login', () => {
        test('Should return 200 on login', async () => {
            const passwordHash = await hash('123', 12)
            await accountCollection.insertOne({
                name: 'Binner',
                email: 'binner@email.com',
                password: passwordHash,
            })
            await request(app)
                .post('/api/login')
                .send({
                    email: 'binner@email.com',
                    password: '123'
                })
                .expect(200)
        })
    })
})