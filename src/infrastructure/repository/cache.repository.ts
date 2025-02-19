import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Character } from '../services/Istar-wars.service'
import { IPage } from '../../utils/page'
import { ICacheRepository } from './Icache.repository'
import { PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { getTTL } from '../../utils/time-in-milliseconds'
import { paginateItems } from '../../utils/paginate'
import { Constants } from '../../utils/constants'

export class CacheRepository implements ICacheRepository {
	private tableName = Constants.CACHE_TABLE

	constructor(private client: DynamoDBClient) {
	}

	async save(character: Character): Promise<void> {
		try {
			const item = {
				id: character.id,
				name: character.name,
				height: character.height,
				mass: character.mass,
				hairColor: character.hairColor,
				skinColor: character.skinColor,
				eyeColor: character.eyeColor,
				birthYear: character.birthYear,
				gender: character.gender,
				homeWorld: character.homeWorld,
				films: character.films,
				species: character.species,
				vehicles: character.vehicles,
				starships: character.starships,
				created: character.created.toISOString(),
				edited: character.edited.toISOString(),
				url: character.url,
				characterId: character.characterId,
				globalPartition: character.globalPartition,
				createdAt: character.createdAt.toISOString(),
				weightCategory: character.weightCategory,
				ttl: getTTL(Constants.TIME_30_MINUTES),
			}
			console.log(item)
			const command = new PutCommand({
				TableName: this.tableName,
				Item: item,
			})
			await this.client.send(command)
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async getMergedByCharacterId(characterId: string): Promise<Character | null> {
		try {
			const command = new QueryCommand({
				TableName: this.tableName,
				KeyConditionExpression: 'globalPartition = :globalPartition',
				FilterExpression: 'characterId = :characterId',
				ExpressionAttributeValues: {
					':characterId': characterId,
					':globalPartition': Constants.GLOBAL_PARTITION,
				},
				Limit: 1,
			})
			const response = await this.client.send(command)
			if (response?.Items?.[0] === undefined) return null
			const characterDao = response.Items[0]
			const character = new Character(
				characterDao.id,
				characterDao.name,
				characterDao.height,
				characterDao.mass,
				characterDao.hairColor,
				characterDao.skinColor,
				characterDao.eyeColor,
				characterDao.birthYear,
				characterDao.gender,
				characterDao.homeWorld,
				characterDao.films,
				characterDao.species,
				characterDao.vehicles,
				characterDao.starships,
				new Date(characterDao.created),
				new Date(characterDao.edited),
				characterDao.url,
				characterDao.characterId,
				new Date(characterDao.createdAt),
				characterDao.globalPartition,
			)
			character.weightCategory = characterDao.weightCategory
			return character
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async getMergedPage(limit: number, start: number): Promise<IPage<Character>> {
		try {
			const command = new ScanCommand({
				TableName: this.tableName,
			})

			const response = await this.client.send(command)
			const items = (response.Items ?? []).map(item => {
				const character = new Character(
					item.id,
					item.name,
					item.height,
					item.mass,
					item.hairColor,
					item.skinColor,
					item.eyeColor,
					item.birthYear,
					item.gender,
					item.homeWorld,
					item.films,
					item.species,
					item.vehicles,
					item.starships,
					new Date(item.created),
					new Date(item.edited),
					item.url,
					item.characterId,
					new Date(item.createdAt),
					item.globalPartition,
				)
				character.weightCategory = item.weightCategory
				return character
			})

			items.sort((leftCharacter, rightCharacter) => leftCharacter.createdAt.getTime() - rightCharacter.createdAt.getTime())

			return {
				items: paginateItems(items, limit, start),
				meta: {
					limit: limit,
					start: start,
					length: items.length,
				}
			}
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
