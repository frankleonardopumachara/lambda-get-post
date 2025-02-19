
// Mock para el caso de uso `getMergedUseCase`
import { GetMergedHttp } from '../../src/application/merged.http'
import { CharacterNotFound } from '../../src/domain/errors/errors'

const mockGetMergedUseCase = jest.fn();

describe('GetMergedHttp', () => {
	let handler: ReturnType<typeof GetMergedHttp>;

	beforeEach(() => {
		handler = GetMergedHttp(mockGetMergedUseCase);
		jest.clearAllMocks();
	});

	it('debería devolver 400 si falta el parámetro characterId', async () => {
		const mockEvent = { queryStringParameters: {} } as any;
		const result = await handler(mockEvent, {});
		expect(result.statusCode).toBe(400);
		expect(result.body).toBe(JSON.stringify({
			message: 'Datos invalidos'
		}))
	});

	it('debería devolver 404 si el personaje no es encontrado', async () => {
		mockGetMergedUseCase.mockRejectedValue(new CharacterNotFound());
		const mockEvent = { queryStringParameters: { characterId: '123' } } as any;
		const result = await handler(mockEvent, {});
		expect(result.statusCode).toBe(404);
		expect(result.body).toBe(JSON.stringify({
			message: 'No se encontro personaje'
		}))
	});

	it('debería devolver 500 si ocurre un error desconocido', async () => {
		mockGetMergedUseCase.mockRejectedValue(new Error('Unexpected error'));
		const mockEvent = { queryStringParameters: { characterId: '123' } } as any;
		const result = await handler(mockEvent, {});
		expect(result.statusCode).toBe(500);
		expect(result.body).toContain('Failed to retrieve character.');
	});

	it('debería devolver 200 con datos de personaje cuando la operación es exitosa', async () => {
		const mockResult = {
			characterId: '123',
			name: 'Luke Skywalker',
			height: '172',
			mass: '77',
			hairColor: 'blond',
			skinColor: 'fair',
			eyeColor: 'blue',
			birthYear: '19BBY',
			gender: 'male',
			homeWorld: 'Tatooine',
			films: ['A New Hope', 'The Empire Strikes Back'],
			species: [],
			vehicles: [],
			starships: [],
			created: new Date('2022-01-01T00:00:00Z'),
			edited: new Date('2022-01-02T00:00:00Z'),
			url: 'https://swapi.dev/api/people/1/',
			weightCategory: 'Normal',
		};
		mockGetMergedUseCase.mockResolvedValue(mockResult);
		const mockEvent = { queryStringParameters: { characterId: '123' } } as any;
		const result = await handler(mockEvent, {});
		expect(result.statusCode).toBe(200);
		expect(result.body).toContain('Luke Skywalker');
		expect(result.body).toContain('Normal');
	});
});
