import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyCollection: Collection

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
    })

    describe('POST /surveys', () => {
        test('Should return 204 on add survey success', async () => {
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
                .expect(204)
        })
    })
})