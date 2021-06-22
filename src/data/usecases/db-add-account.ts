import { AddAccount } from '@/domain/usecases'
import { Hasher, AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)
    let newAccount: AccountModel = null
    if (!account) {
      const hashedPassword = await this.hasher.hash(params.password)
      newAccount = await this.addAccountRepository.add({ ...params, password: hashedPassword })
    }
    return newAccount !== null
  }
}
