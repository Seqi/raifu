import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [MikroOrmModule.forRoot()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
