import { Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from 'src/auth'
import { LoadoutService } from '.'
import { LoadoutController } from './loadout.controller'

describe('LoadoutController', () => {
	let controller: LoadoutController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LoadoutController],
			providers: [
				{
					provide: LoadoutService,
					useValue: {},
				},
				UserService,
				Logger,
			],
		}).compile()

		module.useLogger(false)

		controller = module.get<LoadoutController>(LoadoutController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
