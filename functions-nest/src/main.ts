import { INestApplication, Logger, LoggerService } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express, { Express } from 'express'
import * as functions from 'firebase-functions'
import { AppModule } from './app.module'
import { WinstonModule, utilities } from 'nest-winston'
import { transports, format } from 'winston'
const expressServer = express()

const createNestServer = async (expressInstance: Express): Promise<INestApplication> => {
	const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance), {
		logger: WinstonModule.createLogger({
			level: process.env.LOG_LEVEL || 'debug',
			transports: [
				new transports.Console({
					format: format.combine(
						format.timestamp(),
						format.errors({ stack: true }),
						format.ms(),
						utilities.format.nestLike('RaifuApi', { prettyPrint: true }),
					),
				}),
			],
		}),
	})

	return await app.init()
}

createNestServer(expressServer)
	.then((app) => {
		const logger = app.get<LoggerService>(Logger)
		logger.log('Nest server started.')
	})
	.catch((e) => console.error('Nest server failed to start.', e))

export const api = functions.https.onRequest(expressServer)
