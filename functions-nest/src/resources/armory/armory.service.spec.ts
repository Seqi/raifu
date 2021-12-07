import { Test, TestingModule } from '@nestjs/testing'
import { ArmoryService } from './armory.service'

describe('ArmoryService', () => {
	let service: ArmoryService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ArmoryService],
		}).compile()

		service = module.get<ArmoryService>(ArmoryService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
