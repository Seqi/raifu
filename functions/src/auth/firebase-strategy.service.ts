import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { FirebaseAuthStrategy } from '@tfarras/nestjs-firebase-auth'
import { AUTH_STRATEGY_NAME } from './constants'

@Injectable()
export class FirebaseStrategyService extends PassportStrategy(FirebaseAuthStrategy, AUTH_STRATEGY_NAME) {
	public constructor() {
		super({
			extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
		})
	}
}
