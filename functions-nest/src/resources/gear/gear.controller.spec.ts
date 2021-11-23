import { Test, TestingModule } from '@nestjs/testing'
import { GearController } from './gear.controller'

describe('GearController', () => {
	let controller: GearController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GearController],
		}).compile()

		controller = module.get<GearController>(GearController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
