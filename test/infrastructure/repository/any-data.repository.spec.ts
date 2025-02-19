import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { AnyDataRepository } from '../../../src/infrastructure/repository/any-data.repository'

jest.mock('@aws-sdk/lib-dynamodb');

describe('AnyDataRepository', () => {
	let documentClientMock: jest.Mocked<DynamoDBDocumentClient>;
	let repository: AnyDataRepository;

	beforeEach(() => {
		documentClientMock = {
			send: jest.fn(),
		} as unknown as jest.Mocked<DynamoDBDocumentClient>;

		repository = new AnyDataRepository(documentClientMock);
	});

	it('debería llamar al cliente DynamoDB con el comando PutCommand al guardar datos', async () => {
		const item = { id: '123', name: 'Test Item' };

		await repository.save(item);

		expect(documentClientMock.send).toHaveBeenCalledTimes(1);
		expect(documentClientMock.send).toHaveBeenCalledWith(
			expect.any(PutCommand)
		);
	});

	it('debería lanzar un error si DynamoDB falla', async () => {
		const item = { id: '123', name: 'Test Item' };
		const error = new Error('DynamoDB error');
		// @ts-ignore
		documentClientMock.send.mockRejectedValueOnce(error);

		await expect(repository.save(item)).rejects.toThrow('DynamoDB error');
	});
});
