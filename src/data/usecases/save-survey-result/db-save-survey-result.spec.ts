import { DbSaveSurveyResult } from './db-save-survey-result'
import { 
  SaveSurveyResultRepository, 
  SurveyResultModel, 
  SaveSurveyResultModel 
} from './db-save-survey-result-protocols'
import MockDate from 'mockdate'

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), { 
  id: 'any_id' 
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel | null> {
      return makeFakeSurveyResult()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult,
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const fakeSurveyResultData = makeFakeSurveyResultData()
    await sut.save(fakeSurveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(fakeSurveyResultData)
  })
})