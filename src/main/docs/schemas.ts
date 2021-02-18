import {
  accountSchema,
  addSurveyParamsSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyResultParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  surveyResultSchema
} from './schemas/'

export default {
  account: accountSchema,
  addSurveyParams: addSurveyParamsSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  saveSurveyResultParams: saveSurveyResultParamsSchema,
  signUpParams: signUpParamsSchema,
  surveyAnswer: surveyAnswerSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyResult: surveyResultSchema
}
