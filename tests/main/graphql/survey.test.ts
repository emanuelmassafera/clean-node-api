import { makeApolloServer } from './helpers'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

let apolloServer: ApolloServer
let accountCollection: Collection
let surveyCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('Surveys Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `
    test('Should return surveys', async () => {
      const accessToken = await makeAccessToken()
      const now = new Date()
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: now
      })
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const result: any = await query(surveysQuery)

      expect(result.data.surveys.length).toBe(1)
      expect(result.data.surveys[0].id).toBeTruthy()
      expect(result.data.surveys[0].question).toBe('Question')
      expect(result.data.surveys[0].date).toBe(now.toISOString())
      expect(result.data.surveys[0].didAnswer).toBe(false)
      expect(result.data.surveys[0].answers).toEqual([{
        answer: 'Answer 1',
        image: 'http://image-name.com'
      },
      {
        answer: 'Answer 2',
        image: null
      }])
    })
  })
})
