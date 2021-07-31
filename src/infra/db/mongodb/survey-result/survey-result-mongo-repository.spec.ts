import { AccountModel } from '@/domain/models/account';
import { SurveyModel } from '@/domain/models/survey';
import { AddAccountModel } from '@/domain/usecases/account/add-account';
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey';
import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeFakeSurvey = (): AddSurveyModel => ({
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

const makeFakeAddAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(makeFakeSurvey())
  return MongoHelper.map(res.ops[0])
}

const makeAddAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(makeFakeAddAccount())
  return MongoHelper.map(res.ops[0])
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAddAccount()
      const sut = makeSut()
      let surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult?.id).toBeTruthy()
      expect(surveyResult?.answer).toEqual(survey.answers[0].answer)
    })

    test('Should update survey result if its not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAddAccount()
      const res = await surveyResultCollection.insertOne({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      let surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult?.id).toEqual(res.ops[0]._id)
      expect(surveyResult?.answer).toEqual(survey.answers[1].answer)
    })
  })
})