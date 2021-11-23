import { Test, TestingModule } from '@nestjs/testing'
import { GearService } from './gear.service'

describe('GearService', () => {
	let service: GearService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GearService],
		}).compile()

		service = module.get<GearService>(GearService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
