import { Test, TestingModule } from '@nestjs/testing'
import { ArmoryController } from './armory.controller'
import { ArmoryService } from './armory.service'

describe('ArmoryController', () => {
	let controller: ArmoryController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ArmoryController],
			providers: [ArmoryService],
		}).compile()

		controller = module.get<ArmoryController>(ArmoryController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
