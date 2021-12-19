import { Controller, Delete, Inject, Logger, LoggerService, Param, Post } from '@nestjs/common'
import { UserService } from 'src/auth'
import { LoadoutWeaponAttachmentService } from '../services/loadout-weapon-attachment.service'

@Controller('loadouts/:loadoutId/weapons')
export class LoadoutWeaponAttachmentController {
	constructor(
		private loadoutWeaponAttachments: LoadoutWeaponAttachmentService,
		private user: UserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Post(':weaponId/attachments/:attachmentId')
	async create(
		@Param('loadoutId') loadoutId: string,
		@Param('weaponId') weaponId: string,
		@Param('attachmentId') attachmentId: string,
	) {
		this.logger.log({
			message: 'Adding attachment to loadout weapon.',
			userId: this.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		try {
			await this.loadoutWeaponAttachments.add(loadoutId, weaponId, attachmentId)

			this.logger.log({
				message: 'Successfully added attachment to loadout weapon.',
				userId: this.user.uid,
				weaponId,
				attachmentId,
				loadoutId,
				event: 'LOADOUT_ADD_WEAPON_ATTACHMENT',
			})
		} catch (e) {
			this.logger.error({
				message: 'Error removing attachment from loadout weapon.',
				userId: this.user.uid,
				weaponId,
				attachmentId,
				loadoutId,
			})

			throw e
		}
	}

	@Delete(':weaponId/attachments/:attachmentId')
	async delete(
		@Param('loadoutId') loadoutId: string,
		@Param('weaponId') weaponId: string,
		@Param('attachmentId') attachmentId: string,
	) {
		this.logger.log({
			message: 'Removing attachment from loadout weapon.',
			userId: this.user.uid,
			weaponId,
			attachmentId,
			loadoutId,
		})

		try {
			await this.loadoutWeaponAttachments.delete(loadoutId, weaponId, attachmentId)

			this.logger.log({
				message: 'Successfully removed attachment from loadout weapon.',
				userId: this.user.uid,
				weaponId,
				attachmentId,
				loadoutId,
				event: 'LOADOUT_REMOVE_WEAPON_ATTACHMENT',
			})
		} catch (e) {
			this.logger.error({
				message: 'Error removing attachment from loadout weapon.',
				userId: this.user.uid,
				weaponId,
				attachmentId,
				loadoutId,
			})

			throw e
		}
	}
}
