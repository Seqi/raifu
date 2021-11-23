import { Test, TestingModule } from '@nestjs/testing'
import { ClothingService } from './clothing.service'

describe('ClothingService', () => {
	let service: ClothingService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ClothingService],
		}).compile()

		service = module.get<ClothingService>(ClothingService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
