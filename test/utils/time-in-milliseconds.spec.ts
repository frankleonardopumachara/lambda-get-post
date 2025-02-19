import { getTTL } from '../../src/utils/time-in-milliseconds'

describe('getTTL', () => {
	it('debería calcular el TTL correctamente para 5 minutos', () => {
		const timeInMinutes = 5;
		const currentTimeInSeconds = Math.floor(Date.now() / 1000);
		const expectedTTL = currentTimeInSeconds + (timeInMinutes * 60);

		const result = getTTL(timeInMinutes);

		expect(result).toBeGreaterThanOrEqual(expectedTTL); // Asegura que el TTL calculado es correcto o mayor por un pequeño margen debido al tiempo de ejecución
		expect(result).toBeLessThanOrEqual(expectedTTL + 1); // Tolerancia de 1 segundo por el tiempo de ejecución
	});

	it('debería calcular el TTL correctamente para 0 minutos (debería ser igual al tiempo actual)', () => {
		const timeInMinutes = 0;
		const currentTimeInSeconds = Math.floor(Date.now() / 1000);

		const result = getTTL(timeInMinutes);

		expect(result).toBeGreaterThanOrEqual(currentTimeInSeconds);
		expect(result).toBeLessThanOrEqual(currentTimeInSeconds + 1); // Tolerancia de 1 segundo
	});

	it('debería calcular el TTL correctamente para tiempos negativos', () => {
		const timeInMinutes = -5;
		const currentTimeInSeconds = Math.floor(Date.now() / 1000);
		const expectedTTL = currentTimeInSeconds + (timeInMinutes * 60);

		const result = getTTL(timeInMinutes);

		expect(result).toBe(expectedTTL); // Debería calcular correctamente incluso con tiempos negativos
	});
});
