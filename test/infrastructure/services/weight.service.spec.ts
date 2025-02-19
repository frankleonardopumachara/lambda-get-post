import axios from 'axios';
import { WeightService } from '../../../src/infrastructure/services/weight.service'
import { WeightCategory } from '../../../src/infrastructure/services/IBMI.service'
import { Constants } from '../../../src/utils/constants';

jest.mock('axios');

describe('WeightService', () => {
	let weightService: WeightService;
	const mockedAxios = axios as jest.Mocked<typeof axios>;

	beforeEach(() => {
		weightService = new WeightService();
	});

	it('debería devolver una categoría de peso cuando se pasa el peso y la altura', async () => {
		// Simular respuesta de la API
		const mockBMIResponse = {
			bmiCategoryForAdults: {
				category: 'Normal weight',
			},
		};

		mockedAxios.get.mockResolvedValueOnce({ data: mockBMIResponse });

		const weight = '70'; // en kg
		const height = '170'; // en cm
		const result = await weightService.getBMICategory(weight, height);

		expect(result).toBeInstanceOf(WeightCategory);
		expect(result.value).toBe('Normal weight');
		expect(mockedAxios.get).toHaveBeenCalledWith(`${Constants.BMI_CALCULATOR_BASE}`, {
			params: { kg: weight, cm: height },
			headers: {
				'x-rapidapi-host': Constants.BMI_CALCULATOR_HOST,
				'x-rapidapi-key': Constants.BMI_CALCULATOR_KEY,
			},
		});
	});

	it('debería lanzar un error si la API falla', async () => {
		mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

		await expect(weightService.getBMICategory('70', '170')).rejects.toThrow('API Error');
	});
});
