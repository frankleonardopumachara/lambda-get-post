import { INotificationService } from "../../../src/infrastructure/services/types";
import { GetPublishNotificationUseCase } from "../../../src/domain/usecases/usecase";

describe('GetPublishNotificationUseCase', () => {

  it('should throw error', async () => {
    const service: INotificationService = {
      publishNotification: () => Promise.reject(new Error())
    }
    const useCase = GetPublishNotificationUseCase(service)
    await expect(useCase({arn: 'arn', title: 'Hey', body: 'content goes here'})).rejects.toBeInstanceOf(Error)
  })
})
