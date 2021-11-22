import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { Attachment } from './models'
import { AttachmentService } from './services'
import { AttachmentController } from './controllers'

@Module({
	imports: [MikroOrmModule.forFeature([Attachment])],
	controllers: [AttachmentController],
	providers: [AttachmentService, Logger],
})
export class AttachmentModule {}
