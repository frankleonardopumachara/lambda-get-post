export interface IAnyDataRepository {
	save(item: Record<string, any>): Promise<void>
}
