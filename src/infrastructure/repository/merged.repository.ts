import { IMergedRepository } from './Imerged.repository'

export class MergedRepository implements IMergedRepository {
  async save(item: Record<string, any>): Promise<void> {
    return
  }
}
