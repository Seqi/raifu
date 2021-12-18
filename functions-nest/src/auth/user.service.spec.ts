import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

describe('UserService', () => {
	let service: UserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService],
		}).compile()

		service = await module.resolve<UserService>(UserService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
