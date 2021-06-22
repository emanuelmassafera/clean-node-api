import { AddAccount, Authentication, LoadAccountByToken } from '@/domain/usecases'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  result = true
  addAccountParams: AddAccount.Params

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = params
    return await Promise.resolve(this.result)
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return await Promise.resolve(this.result)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  result = { id: faker.random.uuid() }
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.result)
  }
}
