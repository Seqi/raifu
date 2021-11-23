import { Test, TestingModule } from '@nestjs/testing'
import { LoadoutService } from '.'

describe('LoadoutService', () => {
	let service: LoadoutService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LoadoutService],
		}).compile()

		service = module.get<LoadoutService>(LoadoutService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
