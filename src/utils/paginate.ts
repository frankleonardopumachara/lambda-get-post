export function paginateItems<T>(items: T[], limit: number, startIndex: number): T[] {
	if (limit <= 0) throw new Error('limit should be more than 0')
	if (startIndex < 0) throw new Error('index should be more or equals than 0')

	const paginatedItems = items.slice(startIndex, startIndex + limit)

	return [...paginatedItems]
}
