import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

import { app, initializeApp } from 'firebase-admin'
import { FirebaseUserService } from './services/firebase-user.service'

export const FirebaseAuth = Symbol('FirebaseAuth')
export const FirebaseApp = Symbol('FirebaseApp')

@Global()
@Module({})
export class FirebaseModule {
	static forRoot(): DynamicModule {
		const app = initializeApp()

		const providers: Provider[] = [
			FirebaseUserService,
			{
				provide: FirebaseApp,
				useValue: app,
			},
			{
				provide: FirebaseAuth,
				useFactory: (app: app.App) => app.auth(),
				inject: [FirebaseApp],
			},
		]

		return {
			module: FirebaseModule,
			providers: [...providers],
			exports: [...providers],
		}
	}
}
