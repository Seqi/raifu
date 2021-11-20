import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

import { initializeApp, App } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

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
				useFactory: (app: App) => getAuth(app),
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
