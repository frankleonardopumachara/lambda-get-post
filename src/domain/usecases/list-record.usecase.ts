import { IListRecordUseCaseParams } from '../models/models'
import { AppError } from '../errors/errors'
import { ICacheRepository } from '../../infrastructure/repository/Icache.repository'

export const GetListRecordUseCase = (
	cacheRepository: ICacheRepository,
) => async (params: IListRecordUseCaseParams) => {
	try {
		return await cacheRepository.getMergedPage(params.limit, params.start)
	} catch (error) {
		throw new AppError()
	}
}
