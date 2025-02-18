import { IGetMergedUseCaseParams } from '../models/models'
import { AppError, CharacterNotFound } from '../errors/errors'
import { Character, IStarWarsService } from '../../infrastructure/services/Istar-wars.service'
import { IBMIService, WeightCategory } from '../../infrastructure/services/IBMI.service'

export const GetMergedUseCase = (
  starWarsService: IStarWarsService,
  bmiService: IBMIService,
) => async (params: IGetMergedUseCaseParams): Promise<Character> => {
  try {
    const character: Character = await starWarsService.getCharacter(params.characterId)
    const bmi: WeightCategory = await bmiService.getBMICategory(character.mass, character.height)
    character.weightCategory = bmi.value
    return character
  } catch (error) {
    if (error instanceof CharacterNotFound) throw error
    throw new AppError()
  }
}
