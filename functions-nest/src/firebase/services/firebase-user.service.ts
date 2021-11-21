import { Injectable, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.REQUEST })
export class FirebaseUserService {
	get uid(): string {
		return Date.now().toString()
	}

	public test: string
}
