import { Test, TestingModule } from '@nestjs/testing'
import { LoadoutController } from './loadout.controller'

describe('LoadoutController', () => {
	let controller: LoadoutController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LoadoutController],
		}).compile()

		controller = module.get<LoadoutController>(LoadoutController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
