import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export interface AddAccountRepository {
  add: (params: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params

  export type Result = AccountModel
}
