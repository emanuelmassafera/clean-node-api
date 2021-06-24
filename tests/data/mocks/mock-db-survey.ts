import { AddSurveyRepository, CheckSurveyByIdRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params

  async add (params: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = params
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  result = mockSurveyModel()

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveyModels = mockSurveyModels()
  accountId: string

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModels
  }
}
