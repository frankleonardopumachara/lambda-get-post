import { paginateItems } from '../../src/utils/paginate'

describe('paginateItems', () => {
	const sampleItems = ['item1', 'item2', 'item3', 'item4', 'item5'];

	it('debería devolver los elementos paginados correctamente', () => {
		const result = paginateItems(sampleItems, 2, 1); // Debería devolver ['item2', 'item3']
		expect(result).toEqual(['item2', 'item3']);
	});

	it('debería devolver todos los elementos si el límite es mayor que el tamaño de la lista restante', () => {
		const result = paginateItems(sampleItems, 10, 3); // Debería devolver ['item4', 'item5']
		expect(result).toEqual(['item4', 'item5']);
	});

	it('debería devolver una lista vacía si el índice de inicio es igual al tamaño del array', () => {
		const result = paginateItems(sampleItems, 2, sampleItems.length); // Debería devolver []
		expect(result).toEqual([]);
	});

	it('debería devolver una lista vacía si el índice de inicio es mayor que el tamaño del array', () => {
		const result = paginateItems(sampleItems, 2, 10); // Debería devolver []
		expect(result).toEqual([]);
	});

	it('debería lanzar un error si el límite es menor o igual a 0', () => {
		expect(() => paginateItems(sampleItems, -1, 2)).toThrow('limit should be more than 0');
	});

	it('debería lanzar un error si el índice de inicio es menor que 0', () => {
		expect(() => paginateItems(sampleItems, 2, -1)).toThrow('index should be more or equals than 0');
	});
});
