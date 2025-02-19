import { ListRecordUseCaseType } from '../domain/models/models'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { InvalidData } from '../domain/errors/errors'

export const GetListRecordHttp = (listRecordUseCase: ListRecordUseCaseType) => async (event: APIGatewayProxyEvent, context: any) => {
	try {
		console.log(event, context)
		const limit = event.queryStringParameters?.limit
		const start = event.queryStringParameters?.start

		if (!limit || !start) throw new InvalidData({message: 'Invalid parameters'})

		const page = await listRecordUseCase({
			limit: +limit,
			start: +start,
		})

		return {
			statusCode: 200,
			body: JSON.stringify({
				items: page.items.map(character => ({
					id: character.id,
					name: character.name,
					height: character.height,
					mass: character.mass,
					hairColor: character.hairColor,
					skinColor: character.skinColor,
					eyeColor: character.eyeColor,
					birthYear: character.birthYear,
					gender: character.gender,
					homeWorld: character.homeWorld,
					films: character.films,
					species: character.species,
					vehicles: character.vehicles,
					starshipsL: character.starships,
					created: character.created.toISOString(),
					edited: character.edited.toISOString(),
					url: character.url,
					characterId: character.characterId,
					createdAt: character.createdAt.toISOString(),
					weightCategory: character.weightCategory,
				})),
				meta: page.meta,
			}),
		}
	} catch (error) {
		console.log('error', error)
		if (error instanceof InvalidData) {
			return {
				statusCode: 400,
				body: JSON.stringify({message: error.message}),
			}
		} else {
			return {
				statusCode: 500,
				body: JSON.stringify({message: 'Failed to get page'}),
			}
		}
	}
}
