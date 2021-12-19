import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { Attachment, LoadoutWeapon, LoadoutWeaponAttachment } from 'src/entities'
import { UserService } from 'src/auth'
import { InjectResourceService, ResourceService } from '../../resource'

@Injectable()
export class LoadoutWeaponAttachmentService {
	constructor(
		@InjectRepository(LoadoutWeaponAttachment) private em: EntityRepository<LoadoutWeaponAttachment>,
		@InjectRepository(LoadoutWeapon) private loadoutWeapon: EntityRepository<LoadoutWeapon>,
		@InjectResourceService(Attachment) private attachments: ResourceService<Attachment>,
		private user: UserService,
	) {}

	async add(loadoutId: string, weaponId: string, attachmentId: string) {
		// TODO: Add loadoutId directly on the entity
		const loadoutWeapon = await this.loadoutWeapon.findOne({
			loadout: { id: loadoutId, uid: this.user.uid },
			weapon: { id: weaponId, uid: this.user.uid },
		})

		if (!loadoutWeapon) {
			throw new NotFoundException('Loadout weapon not found.')
		}

		const attachment = await this.attachments.getById(attachmentId)
		if (!attachment) {
			throw new NotFoundException('Attachment not found.')
		}

		// Ensure the combo doesnt exist yet
		const exists =
			(await this.em.count({
				loadout: { id: loadoutId },
				attachment: { id: attachmentId },
				weapon: { id: weaponId },
			})) > 0

		if (!exists) {
			throw new ConflictException('Attachment already exists on loadout.')
		}

		const loadoutWeaponAttachment = new LoadoutWeaponAttachment(loadoutWeapon, attachment)
		loadoutWeapon.attachments.add(loadoutWeaponAttachment)

		await this.em.flush()
	}

	async delete(loadoutId: string, weaponId: string, attachmentId: string): Promise<boolean> {
		const result = await this.em.nativeDelete({
			loadout: {
				id: loadoutId,
				uid: this.user.uid,
			},
			weapon: {
				id: weaponId,
				uid: this.user.uid,
			},
			attachment: {
				id: attachmentId,
				uid: this.user.uid,
			},
		})

		return result > 0
	}
}
