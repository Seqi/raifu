import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseUserService } from './firebase-user.service'

describe('FirebaseUserService', () => {
	let service: FirebaseUserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FirebaseUserService],
		}).compile()

		service = await module.resolve<FirebaseUserService>(FirebaseUserService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
