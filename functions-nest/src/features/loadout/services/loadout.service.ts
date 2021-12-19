import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository, QueryOrder } from '@mikro-orm/core'

import { UserService } from 'src/auth'
import { Loadout } from '../models'
import { CreateLoadoutDto, UpdateLoadoutDto, ViewLoadoutDto, ViewLoadoutWeaponDto } from '../loadout.dto'
import { Clothing, Gear } from 'src/entities'

@Injectable()
export class LoadoutService {
	constructor(
		@InjectRepository(Loadout)
		private repo: EntityRepository<Loadout>,
		private user: UserService,
	) {}

	async getAll(): Promise<Loadout[]> {
		// TODO: Remove uid from result
		const result = await this.repo.find(
			{
				uid: this.user.uid,
			},
			{
				orderBy: { createdAt: QueryOrder.ASC },
				populate: { weapons: true },
			},
		)

		return result
	}

	async getById(id: string): Promise<ViewLoadoutDto> {
		// TODO: Remove uid from result
		const loadout = await this.repo.findOne(
			{
				id,
				$or: [{ uid: this.user.uid }, { shared: true }],
			},
			{
				populate: {
					weapons: {
						attachments: true,
					},
					gear: true,
					clothing: true,
				},
			},
		)

		const weapons: ViewLoadoutWeaponDto[] = loadout.weapons
			.getSnapshot()
			.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
			.flatMap((loadoutWeapon) => {
				const attachments = loadoutWeapon.attachments.getSnapshot().map((lwa) => ({
					...lwa.attachment,
					createdAt: lwa.createdAt,
					updatedAt: lwa.updatedAt,
				}))

				return {
					...loadoutWeapon.weapon,
					createdAt: loadoutWeapon.createdAt,
					updatedAt: loadoutWeapon.updatedAt,
					attachments,
				} as ViewLoadoutWeaponDto
			})

		const gear: Gear[] = loadout.gear
			.getSnapshot()
			.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
			.flatMap((loadoutGear) => ({
				...loadoutGear.gear,
				createdAt: loadoutGear.createdAt,
				updatedAt: loadoutGear.updatedAt,
			}))

		const clothing: Clothing[] = loadout.clothing
			.getSnapshot()
			.sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
			.flatMap((loadoutClothing) => ({
				...loadoutClothing.clothing,
				createdAt: loadoutClothing.createdAt,
				updatedAt: loadoutClothing.updatedAt,
			}))

		const { uid, ...loadoutDto } = loadout
		const dto: ViewLoadoutDto = {
			...loadoutDto,
			weapons,
			gear,
			clothing,
		}

		return { ...dto, weapons, gear, clothing }
	}

	async add(dto: CreateLoadoutDto): Promise<Loadout> {
		// TODO: Validate no id being sent in at controller
		const loadout = this.repo.create({ uid: this.user.uid, ...dto })
		this.repo.persistAndFlush(loadout)

		return loadout
	}

	async update(id: string, dto: UpdateLoadoutDto): Promise<void> {
		const loadout = await this.repo.findOne({ id })

		if (!loadout) {
			throw new NotFoundException()
		}

		Object.apply(loadout, dto)
		this.repo.flush()
	}

	async remove(id: string): Promise<void> {
		const ref = this.repo.getReference(id)
		await this.repo.removeAndFlush(ref)
	}
}
