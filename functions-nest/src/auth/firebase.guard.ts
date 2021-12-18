import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { ALLOW_ANON_TOKEN, AUTH_STRATEGY_NAME } from './constants'

@Injectable()
export class FirebaseAuthGuard extends AuthGuard(AUTH_STRATEGY_NAME) {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const allowAnonymous = this.reflector.getAllAndOverride<boolean>(ALLOW_ANON_TOKEN, [
			context.getHandler(),
			context.getClass(),
		])

		if (allowAnonymous) {
			return true
		}

		return super.canActivate(context)
	}
}
