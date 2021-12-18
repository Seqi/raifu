import { Test, TestingModule } from '@nestjs/testing'
import { ResourceService } from './resource.service'
import { Weapon } from '../../entities'
import {
	createResourceController,
	ResourceControllerClass as ResourceController,
} from './resource.controller'
import { createResourceServiceToken } from './tokens'
import { UserService } from 'src/auth'
import { Logger } from '@nestjs/common'

describe('ResourceController', () => {
	let controller: ResourceController<Weapon>

	beforeEach(async () => {
		const token = createResourceServiceToken(Weapon)
		const service: ResourceService<Weapon> = {
			getAll: jest.fn(),
			create: jest.fn(),
			delete: jest.fn(),
		}

		const user: UserService = {
			uid: '123',
		}

		const controllerClass = createResourceController(Weapon)

		const module: TestingModule = await Test.createTestingModule({
			controllers: [controllerClass],
			providers: [
				{
					provide: token,
					useValue: service,
				},
				{
					provide: UserService,
					useValue: user,
				},
				Logger,
			],
		}).compile()

		module.useLogger(false)

		controller = module.get<ResourceController<Weapon>>(controllerClass)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
