import axios from 'axios'
import { Character, ICharacter, IStarWarsService } from './Istar-wars.service'
import { v4 as id } from 'uuid'
import { CharacterNotFound } from '../../domain/errors/errors'
import { Constants } from '../../utils/constants'

export class StarWarsService implements IStarWarsService {
	private baseUrl = 'https://swapi.dev/api'

	async getCharacter(characterId: string): Promise<Character> {
		try {
			const response = await axios.get<ICharacter>(`${ this.baseUrl }/people/${ characterId }`)
			return new Character(
				id(),
				response.data.name,
				response.data.height,
				response.data.mass,
				response.data.hair_color,
				response.data.skin_color,
				response.data.eye_color,
				response.data.birth_year,
				response.data.gender,
				response.data.homeworld,
				response.data.films,
				response.data.species,
				response.data.vehicles,
				response.data.starships,
				new Date(response.data.created),
				new Date(response.data.edited),
				response.data.url,
				characterId,
				new Date(),
				Constants.GLOBAL_PARTITION,
			)
		} catch (error) {
			console.log(error)
			throw new CharacterNotFound()
		}
	}
}
