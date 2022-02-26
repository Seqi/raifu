import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { FirebaseUser } from '@tfarras/nestjs-firebase-auth'

@Injectable({ scope: Scope.REQUEST })
export class UserService {
	constructor(@Inject(REQUEST) private readonly request: Request) {}

	get user(): FirebaseUser {
		return this.request.user as FirebaseUser
	}

	get uid(): string {
		if (!this.user) {
			throw new Error('Attempted to access a user during an unauthenticated request.')
		}

		return this.user.uid
	}
}
