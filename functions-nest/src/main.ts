import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express, { Express } from 'express'
import * as functions from 'firebase-functions'
import { AppModule } from './app.module'

const expressServer = express()

const createFunction = async (expressInstance: Express): Promise<void> => {
	const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))

	await app.init()
}

export const api = functions.https.onRequest(async (request, response) => {
	await createFunction(expressServer)
	expressServer(request, response)
})
