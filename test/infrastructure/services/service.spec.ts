import { PublishCommand } from "@aws-sdk/client-sns";
import { SNSService } from "../../../src/infrastructure/services/service";

jest.mock('@aws-sdk/client-sns', () => ({
  SNSClient: jest.fn(() => ({
    send: jest.fn(),
  })),
  PublishCommand: jest.fn(),
}))

jest.mock('@backend-libraries/lb-culqi-logging', () => ({
  logger: {
    error: jest.fn(),
  },
}))

describe('SNSService', () => {
  let snsService: SNSService

  beforeEach(() => {
    snsService = new SNSService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should publish a notification', async () => {

    const params = {
      arn: 'arn:aws:sns:us-east-1:123456789012:MyTopic',
      title: 'Test Title',
      body: 'Test Body',
    }

    await snsService.publishNotification(params)

    expect(PublishCommand).toHaveBeenCalledWith({
      TargetArn: params.arn,
      MessageStructure: 'json',
      Message: JSON.stringify({
        default: 'Push notification',
        GCM: JSON.stringify({
          notification: {
            title: params.title,
            body: params.body,
          },
        }),
      }),
    })
  })
  //
  // it('should throw an error', async () => {
  //   const mockError = new Error('SNS Error')
  //
  //   const params = {
  //     arn: 'arn:aws:sns:us-east-1:123456789012:MyTopic',
  //     title: 'Test Title',
  //     body: 'Test Body',
  //   }
  //
  //   await expect(snsService.publishNotification(params)).rejects.toEqual(mockError)
  // })
})
