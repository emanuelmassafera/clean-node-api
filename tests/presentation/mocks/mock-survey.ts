import { AddSurvey, CheckSurveyById, LoadSurveyById, LoadSurveys } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModels, mockSurveyModel } from '@/tests/domain/mocks'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurvey.Params

  async add (params: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = params
    return await Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveyModels)
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}