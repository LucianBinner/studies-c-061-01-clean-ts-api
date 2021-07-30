import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../domain/usecases/add-survey'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

let surveyCollection: Collection
let accountCollection: Collection

const makeFakeRequest = (): AddSurveyModel => ({
    question: 'any_question',
    answers: [
        {
            image: 'any_image',
            answer: 'any_answer'
        },
        {
            answer: 'other_answer'
        },
    ],
    date: new Date()
})

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string)
    })

    afterAll(async () => {
        await MongoHelper.disconect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    describe('POST /surveys', () => {
        test('Should return 403 on add survey without accessToken', async () => {
            await request(app)
                .post('/api/surveys')
                .send({
                    question: 'question',
                    answers: [{
                        answer: 'answer_one',
                        image: 'http://image-name.com'
                    }, {
                        answer: 'answer_two'
                    }]
                })
                .expect(403)
        })

        test('Should return 204 on add survey with valid accessToken', async () => {
            const res = await accountCollection.insertOne({
                name: 'Binner',
                email: 'binner@email.com',
                password: '123',
                role: 'admin'
            })
            const id = res.ops[0]._id
            const accessToken = sign({ id }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: id
            }, {
                $set: {
                    accessToken
                }
            })
            await request(app)
                .post('/api/surveys')
                .set('x-access-token', accessToken)
                .send({
                    question: 'question',
                    answers: [{
                        answer: 'answer_one',
                        image: 'http://image-name.com'
                    }, {
                        answer: 'answer_two'
                    }]
                })
                .expect(204)
        })
    })

    describe('GET /surveys', () => {
        test('Should return 403 on load survey without accessToken', async () => {
            await request(app)
                .get('/api/surveys')
                .expect(403)
        })

        test('Should return 200 on load surveys with valid accessToken', async () => {
            const res = await accountCollection.insertOne({
                name: 'Binner',
                email: 'binner@email.com',
                password: '123',
            })
            const id = res.ops[0]._id
            const accessToken = sign({ id }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: id
            }, {
                $set: {
                    accessToken
                }
            })
            await surveyCollection.insertMany([makeFakeRequest()])
            await request(app)
                .get('/api/surveys')
                .set('x-access-token', accessToken)
                .expect(200)
        })
    })
})