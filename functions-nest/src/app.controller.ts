import { Controller, Get } from '@nestjs/common'
import { AllowAnonymous } from './auth'

@Controller()
export class AppController {
	@Get()
	@AllowAnonymous()
	async ping() {
		return 'pong'
	}
}
