export interface IPage<T> {
	items: T[]
	meta: {
		limit: number,
		start: number,
		length: number,
	}
}
