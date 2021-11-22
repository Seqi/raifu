import {
	Controller,
	Delete,
	Get,
	Inject,
	Logger,
	LoggerService,
	Param,
	Post,
} from '@nestjs/common'
import { Attachment } from 'src/entities'
import { FirebaseUserService } from 'src/firebase'
import { AttachmentService } from '../services'

@Controller('attachments')
export class AttachmentController {
	constructor(
		private service: AttachmentService,
		private user: FirebaseUserService,
		@Inject(Logger) private logger: LoggerService,
	) {}

	@Get()
	async getAll(): Promise<Attachment[]> {
		try {
			this.logger.log(`Retrieving attachments`, { userId: this.user.uid })

			const items = await this.service.getAll()

			this.logger.log(`Successfuly retrieved ${items.length} attachments`, {
				userId: this.user.uid,
				event: `ATTACHMENTS_VIEWED`,
			})

			return items
		} catch (e) {
			this.logger.error(`Failed to retrieve attachments.`, { userId: this.user.uid })
			throw e
		}
	}

	@Post()
	async create(dto: any): Promise<Attachment> {
		try {
			this.logger.log(`Creating attachment.`, { userId: this.user.uid, item: dto })

			const result = await this.service.add(dto)
			this.logger.log(`Successfully created attachment.`, {
				userId: this.user.uid,
				itemId: result.id,
				event: `ATTACHMENT_CREATED`,
				result,
			})

			return result
		} catch (e) {
			this.logger.error(`An error occurred adding attachment`, {
				userId: this.user.uid,
				item: dto,
			})

			throw e
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		try {
			this.logger.log(`Deleting attachment.`, { userId: this.user.uid, itemId: id })

			await this.service.remove(id)
		} catch (e) {
			this.logger.error(`Error deleting attachment.`, {
				userId: this.user.uid,
				itemId: id,
			})

			throw e
		}
	}
}
