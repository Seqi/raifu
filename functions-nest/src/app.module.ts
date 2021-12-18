import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'

import { FirebaseModule } from './firebase'
import { AppController } from './app.controller'
import { LoadoutModule } from './features/loadout'
import { ResourceModule } from './features/resource'
import { Attachment, Clothing, Gear, Weapon } from './entities'
import { ArmoryModule } from './features/armory/armory.module'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [
		AuthModule,
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
