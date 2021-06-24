import { SaveSurveyResult } from '@/domain/usecases'
import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/data/protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(params)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(params.surveyId, params.accountId)
    return surveyResult
  }
}
