import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

import type { app } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'

export const FirebaseAuth = Symbol('FirebaseAuth')
export const FirebaseApp = Symbol('FirebaseApp')

@Global()
@Module({})
export class FirebaseModule {
	static forRoot(): DynamicModule {
		const app = initializeApp()

		const providers: Provider[] = [
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
