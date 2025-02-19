import { Messages } from '../../utils/messages'

export interface AppErrorProps<T = Record<string, any>> {
  message?: string
  meta?: T
}

export class AppError<T = Record<string, any>> extends Error {
  private readonly meta: T | Record<string, any>

  constructor({ message = Messages.SOMETHING_WENT_WRONG, meta = {} }: AppErrorProps = {}) {
    super(message)
    this.name = new.target.name
    this.meta = meta
  }

  toPlain() {
    return {
      name: this.name,
      message: this.message,
      meta: this.meta,
    }
  }
}

export class InvalidData extends AppError {
  constructor({ message = Messages.INVALID_DATA, meta = {} }: AppErrorProps = {}) {
    super({ message, meta })
  }
}

export class CharacterNotFound extends AppError {
  constructor({ message = Messages.CHARACTER_NOT_FOUND, meta = {} }: AppErrorProps = {}) {
    super({ message, meta })
  }
}
