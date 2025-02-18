import axios from 'axios'
import { IBMIService, ICategory, WeightCategory } from './IBMI.service'

export class WeightService implements IBMIService {
  private baseUrl: string = 'https://zylalabs.com/api'

  async getBMICategory(weight: string, height: string): Promise<WeightCategory> {
    const result = await axios.get<ICategory>(`${ this.baseUrl }/${ weight }/bmi+calculator+api/${ height }/metric+kilograms`)
    return new WeightCategory(result.data.weightCategory)
  }
}
