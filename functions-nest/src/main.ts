import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express, { Express } from 'express'
import * as functions from 'firebase-functions'
import { AppModule } from './app.module'

const expressServer = express()

const createNestServer = async (expressInstance: Express): Promise<INestApplication> => {
	const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))

	return await app.init()
}

createNestServer(expressServer)
	.then(() => console.log('Nest server started.'))
	.catch((e) => console.error('Nest server failed to start.', e))

export const api = functions.https.onRequest(expressServer)
