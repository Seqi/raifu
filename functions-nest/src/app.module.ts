import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { FirebaseModule } from './firebase'
import { AppController } from './app.controller'
import { LoadoutModule } from './resources/loadout'
import { ResourceModule } from './resources/resource'
import { Attachment, Clothing, Gear, Weapon } from './entities'

@Module({
	imports: [
		FirebaseModule.forRoot(),
		MikroOrmModule.forRoot(),
		ResourceModule.forRoot([
			{ entity: Weapon, route: 'weapons' },
			{ entity: Attachment, route: 'attachments' },
			Gear,
			Clothing,
		]),
		LoadoutModule,
	],
	controllers: [AppController],
	providers: [Logger],
})
export class AppModule {}
