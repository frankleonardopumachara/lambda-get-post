export class WeightCategory {
  constructor(public value: string) {
  }
}

export interface IBMIService {
  getBMICategory(weight: string, height: string): Promise<WeightCategory>
}

export interface ICategory {
  bmi: number
  weight: string
  height: string
  weightCategory: string
}
