import { mockAddSurveyRepository } from '@/data/test';
import { mockSurveyParams, throwError } from '@/domain/test';
import MockDate from 'mockdate';
import { DbAddSurvey } from './db-add-survey';
import { AddSurveyRepository } from './db-add-survey-protocols';

type SutTypes = {
  sut: DbAddSurvey,
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const fakeSurveyData = mockSurveyParams()
    await sut.add(fakeSurveyData)
    expect(addSpy).toHaveBeenCalledWith(fakeSurveyData)
  })

  test('Should throw if Hasher throws', async () => {
      const { sut, addSurveyRepositoryStub } = makeSut()
      jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockSurveyParams())
      await expect(promise).rejects.toThrow()
  })
})