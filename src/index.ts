import { StarWarsService } from './infrastructure/services/star-wars.service'
import { WeightService } from './infrastructure/services/weight.service'
import { GetMergedUseCase } from './domain/usecases/get-merged-usecase'
import { GetMergedHttp } from './application/merged.http'

const starWarsService = new StarWarsService()
const bmiService = new WeightService()

const getMergedUseCase = GetMergedUseCase(starWarsService, bmiService)

export const getMergedHandler = GetMergedHttp(getMergedUseCase)
