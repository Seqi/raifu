import { config } from 'firebase-functions'
import type { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs'
import mikroOrmConfig from '../mikro-orm.config'

export type DbConfig = Pick<MikroOrmModuleSyncOptions, 'dbName' | 'host' | 'user' | 'password'>

export type FbDb = {
	user: string
	password: string
	name: string
	host: string
}

export type Config = {
	db?: FbDb
}

export function getDbConfig(): MikroOrmModuleSyncOptions {
	const fbConfig = config() as Config

	const { entities, entitiesTs, ...trimmedConfig } = mikroOrmConfig

	if (!fbConfig.db) {
		return trimmedConfig
	}

	const { name: dbName, ...rest } = fbConfig.db

	return {
		...trimmedConfig,
		...rest,
		dbName,
	}
}
