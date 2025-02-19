import { IAnyDataRepository } from './Iany-data.repository'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { Constants } from '../../utils/constants'

export class AnyDataRepository implements IAnyDataRepository {
	private tableName = Constants.ANY_DATE_TABLE

	constructor(private documentClient: DynamoDBDocumentClient) {
	}

	async save(item: Record<string, any>): Promise<void> {
		try {
			const command = new PutCommand({
				TableName: this.tableName,
				Item: {
					...item
				}
			})
			await this.documentClient.send(command)
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
