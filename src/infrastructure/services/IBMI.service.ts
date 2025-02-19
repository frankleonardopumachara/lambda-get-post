export class WeightCategory {
	constructor(public value: string) {
	}
}

export interface IBMIService {
	getBMICategory(weight: string, height: string): Promise<WeightCategory>
}

export interface ICategory {
	bmi: number
	height_in_cm: number
	weight_in_kg: number
	bmiCategoryForAdults: {
		category: string
		range: string
		normalRange: string
	}
}
