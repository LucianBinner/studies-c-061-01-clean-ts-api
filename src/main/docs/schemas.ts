import {
  accountSchema, 
  addSurveyParamsSchema, 
  errorSchema, 
  loginParamsSchema, 
  saveSurveyParamsSchema, 
  signUpParamsSchema, 
  surveyAnswerSchema, 
  surveyResultSchema, 
  surveySchema,
  surveysSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  signUpParams: signUpParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
}