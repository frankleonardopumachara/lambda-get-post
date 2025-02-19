import { StoreItemUseCaseType } from '../domain/models/models'
import { APIGatewayProxyEvent } from 'aws-lambda'

export const GetStoreItemHttp = (storeItemUseCase: StoreItemUseCaseType) => async (event: APIGatewayProxyEvent, context: any) => {
	try {
		console.log(event, context)
		const body = JSON.parse(event.body ?? JSON.stringify({}))

		await storeItemUseCase({
			item: body,
		})
		return {
			statusCode: 200,
			body: JSON.stringify({message: 'Item saved successfully'}),
		}
	} catch (error) {
		console.log('error', error)
		return {
			statusCode: 500,
			body: JSON.stringify({message: 'Failed to store item'}),
		}
	}
}
