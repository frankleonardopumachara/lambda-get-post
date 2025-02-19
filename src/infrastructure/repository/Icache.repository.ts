import { Character } from '../services/Istar-wars.service'
import { IPage } from '../../utils/page'

export interface ICacheRepository {
	save(item: Character): Promise<void>

	getMergedByCharacterId(characterId: string): Promise<Character | null>

	getMergedPage(limit: number, start: number): Promise<IPage<Character>>
}
