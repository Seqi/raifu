import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { FirebaseModule } from './firebase'
import { AppController } from './app.controller'
import { LoadoutModule } from './resources/loadout'
import { ResourceModule } from './resources/resource'
import { Attachment, Clothing, Gear, Weapon } from './entities'
import { ArmoryModule } from './resources/armory/armory.module'

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
		ArmoryModule,
		LoadoutModule,
	],
	controllers: [AppController],
	providers: [Logger],
})
export class AppModule {}
