import axios from 'axios'
import { Character, ICharacter, IStarWarsService } from './Istar-wars.service'

export class StarWarsService implements IStarWarsService {
  private baseUrl = 'https://swapi.dev/api'

  async getCharacter(characterId: string): Promise<Character> {
    try {
      const response = await axios.get<ICharacter>(`${ this.baseUrl }/people/${ characterId }`)
      return new Character(
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
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
