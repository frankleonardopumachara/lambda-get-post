export interface IMergedRepository {
  save(item: Record<string, any>): Promise<void>
}
