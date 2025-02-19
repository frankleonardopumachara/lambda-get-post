import axios from 'axios';
import { StarWarsService } from '../../../src/infrastructure/services/star-wars.service'
import { Character } from '../../../src/infrastructure/services/Istar-wars.service'
import { Constants } from '../../../src/utils/Constants';
import { CharacterNotFound } from '../../../src/domain/errors/errors'

jest.mock('axios');

describe('StarWarsService', () => {
	let starWarsService: StarWarsService;
	const mockedAxios = axios as jest.Mocked<typeof axios>;

	beforeEach(() => {
		starWarsService = new StarWarsService();
	});

	it('debería devolver un Character cuando el personaje existe', async () => {
		// Datos simulados de respuesta
		const mockCharacterResponse = {
			name: 'Luke Skywalker',
			height: '172',
			mass: '77',
			hair_color: 'blond',
			skin_color: 'fair',
			eye_color: 'blue',
			birth_year: '19BBY',
			gender: 'male',
			homeworld: 'https://swapi.dev/api/planets/1/',
			films: ['https://swapi.dev/api/films/1/'],
			species: [],
			vehicles: ['https://swapi.dev/api/vehicles/14/'],
			starships: ['https://swapi.dev/api/starships/12/'],
			created: '2014-12-09T13:50:51.644000Z',
			edited: '2014-12-20T21:17:56.891000Z',
			url: 'https://swapi.dev/api/people/1/',
		};

		mockedAxios.get.mockResolvedValueOnce({ data: mockCharacterResponse });

		const result = await starWarsService.getCharacter('1');

		expect(result).toBeInstanceOf(Character);
		expect(result.name).toBe('Luke Skywalker');
		expect(result.height).toBe('172');
		expect(result.gender).toBe('male');
		expect(result.globalPartition).toBe(Constants.GLOBAL_PARTITION);
	});

	it('debería lanzar un error CharacterNotFound cuando el personaje no existe', async () => {
		mockedAxios.get.mockRejectedValueOnce(new Error('Not Found'));

		await expect(starWarsService.getCharacter('9999')).rejects.toThrow(CharacterNotFound);
	});
});
