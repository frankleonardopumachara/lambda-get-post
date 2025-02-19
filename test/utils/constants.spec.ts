import { Constants } from '../../src/utils/constants'

describe('Constants', () => {
	it('debería tener un valor predeterminado para CACHE_TABLE si no está definido en el entorno', () => {
		expect(Constants.CACHE_TABLE).toBe('cache-table-dev')
	})

	it('debería tener el host correcto para BMI_CALCULATOR_HOST', () => {
		expect(Constants.BMI_CALCULATOR_HOST).toBe('smart-body-mass-index-calculator-bmi.p.rapidapi.com')
	})

	it('debería tener la clave correcta para BMI_CALCULATOR_KEY', () => {
		expect(Constants.BMI_CALCULATOR_KEY).toBe('f041735cacmshdf71d33b1a62707p1f7966jsn49e0eedafd47')
	})

	it('debería tener la base URL correcta para BMI_CALCULATOR_BASE', () => {
		expect(Constants.BMI_CALCULATOR_BASE).toBe('https://smart-body-mass-index-calculator-bmi.p.rapidapi.com/api/BMI/metric')
	})

	it('debería tener una constante de tiempo de 30 minutos', () => {
		expect(Constants.TIME_30_MINUTES).toBe(30)
	})

	it('debería tener la partición global como "global"', () => {
		expect(Constants.GLOBAL_PARTITION).toBe('global')
	})

	it('debería tener la categoría desconocida como "Unknown"', () => {
		expect(Constants.UNKNOWN_CATEGORY).toBe('Unknown')
	})
})
