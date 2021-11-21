import { Injectable, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.REQUEST })
export class FirebaseUserService {
	get uid(): string {
		return '7aUGqmPjHD3lGqkDZcy1ZdUKZSsw'
	}
}
