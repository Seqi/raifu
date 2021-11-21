import { Test, TestingModule } from '@nestjs/testing'
import { WeaponController } from './weapon.controller'

describe('WeaponController', () => {
	let controller: WeaponController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WeaponController],
		}).compile()

		controller = module.get<WeaponController>(WeaponController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
