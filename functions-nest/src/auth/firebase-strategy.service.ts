import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { FirebaseAuthStrategy } from '@tfarras/nestjs-firebase-auth'
import { STRATEGY_NAME } from './constants'

@Injectable()
export class FirebaseStrategyService extends PassportStrategy(FirebaseAuthStrategy, STRATEGY_NAME) {
	public constructor() {
		super({
			extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
		})
	}
}
