import { GetMergedUseCaseType } from '../domain/models/models'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { CharacterNotFound, InvalidData } from '../domain/errors/errors'

export const GetMergedHttp = (getMergedUseCase: GetMergedUseCaseType) => async (event: APIGatewayProxyEvent, context: any) => {
	try {
		console.log(event, context)
		const characterId = event.queryStringParameters?.['characterId']
		if (!characterId) throw new InvalidData()

		const result = await getMergedUseCase({characterId})
		return {
			statusCode: 200,
			body: JSON.stringify({
				characterId: result.characterId,
				name: result.name,
				height: result.height,
				mass: result.mass,
				hairColor: result.hairColor,
				skinColor: result.skinColor,
				eyeColor: result.eyeColor,
				birthYear: result.birthYear,
				gender: result.gender,
				homeWorld: result.homeWorld,
				films: result.films,
				species: result.species,
				vehicles: result.vehicles,
				starships: result.starships,
				created: result.created.toISOString(),
				edited: result.edited.toISOString(),
				url: result.url,
				bimCategory: result.weightCategory,
			}),
		}
	} catch (error) {
		console.log('error', error)
		if (error instanceof InvalidData) {
			return {
				statusCode: 400,
				body: JSON.stringify({message: error.message}),
			}
		} else if (error instanceof CharacterNotFound) {
			return {
				statusCode: 404,
				body: JSON.stringify({message: error.message}),
			}
		} else {
			return {
				statusCode: 500,
				body: JSON.stringify({error: 'Failed to retrieve character.'}),
			}
		}
	}
}
