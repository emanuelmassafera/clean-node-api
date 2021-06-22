import { SurveyModel } from '@/domain/models'

export interface AddSurvey {
  add: (params: AddSurvey.Params) => Promise<void>
}

export namespace AddSurvey {
  export type Params = Omit<SurveyModel, 'id'>
}
