import { Character } from '../../infrastructure/services/Istar-wars.service'

export interface IGetMergedUseCaseParams {
  characterId: string
}

export type GetMergedUseCaseType = (params: IGetMergedUseCaseParams) => Promise<Character>
