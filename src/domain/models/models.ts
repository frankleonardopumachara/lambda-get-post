import { Character } from '../../infrastructure/services/Istar-wars.service'
import { IPage } from '../../utils/page'

export interface IGetMergedUseCaseParams {
	characterId: string
}

export type GetMergedUseCaseType = (params: IGetMergedUseCaseParams) => Promise<Character>

export interface IStoreItemUseCaseParams {
	item: Record<string, any>
}

export type StoreItemUseCaseType = (params: IStoreItemUseCaseParams) => Promise<void>

export interface IListRecordUseCaseParams {
	limit: number
	start: number
}

export type ListRecordUseCaseType = (params: IListRecordUseCaseParams) => Promise<IPage<Character>>
