import { Inject, Injectable } from '@nestjs/common'

import { Auth } from 'firebase-admin/auth'
import { EventUser } from 'src/entities'
import { FirebaseAuth } from 'src/firebase'
import { ViewEventUserDto } from '.'
import { ViewLoadoutDto } from '../loadout'

@Injectable()
export class EventUserService {
	constructor(@Inject(FirebaseAuth) private auth: Auth) {}

	async getUser(user: EventUser): Promise<ViewEventUserDto> {
		const firebaseUser = await this.auth.getUser(user.uid)

		const dtoUser: ViewEventUserDto = {
			...user,
			displayName: firebaseUser.displayName || firebaseUser.email,
			loadout: user.loadout && ViewLoadoutDto.fromLoadout(user.loadout),
		}

		return dtoUser
	}
}
