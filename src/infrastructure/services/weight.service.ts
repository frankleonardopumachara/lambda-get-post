import axios from 'axios'
import { IBMIService, ICategory, WeightCategory } from './IBMI.service'
import { Constants } from '../../utils/constants'

export class WeightService implements IBMIService {
	private baseUrl: string = Constants.BMI_CALCULATOR_BASE

	async getBMICategory(weight: string, height: string): Promise<WeightCategory> {
		try {
			const result = await axios.get<ICategory>(`${ this.baseUrl }`, {
				params: {
					kg: weight,
					cm: height,
				},
				headers: {
					'x-rapidapi-host': Constants.BMI_CALCULATOR_HOST,
					'x-rapidapi-key': Constants.BMI_CALCULATOR_KEY,
				}
			})
			return new WeightCategory(result.data.bmiCategoryForAdults.category)
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
