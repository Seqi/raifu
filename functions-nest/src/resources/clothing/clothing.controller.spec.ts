import { Test, TestingModule } from '@nestjs/testing'
import { ClothingController } from './clothing.controller'

describe('ClothingController', () => {
	let controller: ClothingController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClothingController],
		}).compile()

		controller = module.get<ClothingController>(ClothingController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
