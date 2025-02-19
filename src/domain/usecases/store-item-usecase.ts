import { IStoreItemUseCaseParams } from '../models/models'
import { AppError } from '../errors/errors'
import { IAnyDataRepository } from '../../infrastructure/repository/Iany-data.repository'
import { v4 as id } from 'uuid'

export const GetStoreItemUseCase = (
	anyDataRepository: IAnyDataRepository,
) => async (params: IStoreItemUseCaseParams): Promise<void> => {
	try {
		await anyDataRepository.save({
			id: id(), // unique Id
			createdAt: new Date().toISOString(), // iso date
			...params.item, // another data
		})
	} catch (error) {
		throw new AppError()
	}
}
