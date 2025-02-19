import { Constants } from '../../utils/constants'

export class Character {
	private _weightCategory: string = Constants.UNKNOWN_CATEGORY

	constructor(
		public id: string,
		public name: string,
		public height: string,
		public mass: string,
		public hairColor: string,
		public skinColor: string,
		public eyeColor: string,
		public birthYear: string,
		public gender: string,
		public homeWorld: string,
		public films: string[],
		public species: string[],
		public vehicles: string[],
		public starships: string[],
		public created: Date,
		public edited: Date,
		public url: string,
		public characterId: string,
		public createdAt: Date,
		public globalPartition: string,
	) {
	}

	set weightCategory(category: string) {
		this._weightCategory = category
	}

	get weightCategory(): string {
		return this._weightCategory
	}
}

export interface ICharacter {
	name: string
	height: string
	mass: string
	hair_color: string
	skin_color: string
	eye_color: string
	birth_year: string
	gender: string
	homeworld: string
	films: string[]
	species: string[]
	vehicles: string[]
	starships: string[]
	created: string
	edited: string
	url: string
}

export interface IStarWarsService {
	getCharacter(characterId: string): Promise<Character>
}
