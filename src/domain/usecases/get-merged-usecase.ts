import { IGetMergedUseCaseParams } from '../models/models'
import { AppError, CharacterNotFound } from '../errors/errors'
import { Character, IStarWarsService } from '../../infrastructure/services/Istar-wars.service'
import { IBMIService, WeightCategory } from '../../infrastructure/services/IBMI.service'
import { ICacheRepository } from '../../infrastructure/repository/Icache.repository'

export const GetMergedUseCase = (
	starWarsService: IStarWarsService,
	bmiService: IBMIService,
	cacheRepository: ICacheRepository,
) => async (params: IGetMergedUseCaseParams): Promise<Character> => {
	try {
		let character: Character | null

		character = await cacheRepository.getMergedByCharacterId(params.characterId)
		if (character !== null) return character

		character = await starWarsService.getCharacter(params.characterId)
		const bmi: WeightCategory = await bmiService.getBMICategory(character.mass, character.height)
		console.log(bmi)
		character.weightCategory = bmi.value

		await cacheRepository.save(character)

		return character
	} catch (error) {
		if (error instanceof CharacterNotFound) throw error
		throw new AppError()
	}
}
