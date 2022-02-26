import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

import firebase from 'firebase-admin'

export const FirebaseAuth = Symbol('FirebaseAuth')
export const FirebaseApp = Symbol('FirebaseApp')

@Global()
@Module({})
export class FirebaseModule {
	static forRoot(): DynamicModule {
		const app = firebase.initializeApp()

		const providers: Provider[] = [
			{
				provide: FirebaseApp,
				useValue: app,
			},
			{
				provide: FirebaseAuth,
				useFactory: (app: firebase.app.App) => app.auth(),
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
