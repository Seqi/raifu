import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Attachment } from './models'
import { AttachmentService } from './attachment.service'
import { AttachmentController } from './attachment.controller'

@Module({
	imports: [MikroOrmModule.forFeature([Attachment])],
	controllers: [AttachmentController],
	providers: [AttachmentService, Logger],
})
export class AttachmentModule {}
