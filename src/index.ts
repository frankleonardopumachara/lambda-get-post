import { GetStoreItemUseCase } from './domain/usecases/store-item-usecase'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { AnyDataRepository } from './infrastructure/repository/any-data.repository'
import { GetStoreItemHttp } from './application/store.http'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { StarWarsService } from './infrastructure/services/star-wars.service'
import { WeightService } from './infrastructure/services/weight.service'
import { CacheRepository } from './infrastructure/repository/cache.repository'
import { GetMergedUseCase } from './domain/usecases/get-merged-usecase'
import { GetMergedHttp } from './application/merged.http'
import { GetListRecordHttp } from './application/record.http'
import { GetListRecordUseCase } from './domain/usecases/list-record.usecase'

const client = new DynamoDBClient({})
const dynamoDB = DynamoDBDocumentClient.from(client)

const starWarsService = new StarWarsService()
const bmiService = new WeightService()
const cacheRepository = new CacheRepository(client)
const anyDataRepository = new AnyDataRepository(dynamoDB)

const getMergedUseCase = GetMergedUseCase(starWarsService, bmiService, cacheRepository)
const storeItemUseCase = GetStoreItemUseCase(anyDataRepository)
const listRecordUseCase = GetListRecordUseCase(cacheRepository)

export const getMergedHandler = GetMergedHttp(getMergedUseCase)
export const storeItemHandler = GetStoreItemHttp(storeItemUseCase)
export const listRecordHandler = GetListRecordHttp(listRecordUseCase)
