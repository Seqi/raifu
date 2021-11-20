import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { App as FirebaseApp } from 'firebase-admin/app'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject('fb') private fb: FirebaseApp,
	) {}

	@Get()
	async getHello() {
		return this.appService.getHello()
	}
}
