import { AddSurveyParams } from "@/data/usecases/survey/add-survey/db-add-survey-protocols";
import { SurveyModel } from "@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols";

export const mockSurveyModel = (): SurveyModel =>
  Object.assign({}, mockSurveyParams(), { id: 'any_id' })

export const mockSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, {
    answer: 'other_answer'
  }],
  date: new Date()
})

export const mockSurveyModels = (): SurveyModel[] => ([
  mockSurveyModel(),
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }
])