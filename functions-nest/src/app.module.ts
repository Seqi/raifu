import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { FirebaseModule } from './firebase'

@Module({
	imports: [FirebaseModule.forRoot(), MikroOrmModule.forRoot()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
