import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Logger, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { FirebaseModule } from './firebase'
import { AuthModule, FirebaseAuthGuard } from './auth'
import { LoadoutModule } from './features/loadout'
import { ResourceModule } from './features/resource'
import { ArmoryModule } from './features/armory'
import { Attachment, Clothing, Gear, Weapon } from './entities'
import { AppController } from './app.controller'
import { EventModule } from './features/event'
import { getDbConfig } from './config'

@Module({
	imports: [
		AuthModule,
		FirebaseModule.forRoot(),
		// Tihs defaults to our local configuration, but allows
		// for firebase production to overwrite them
		MikroOrmModule.forRoot({
			autoLoadEntities: true,
			...getDbConfig(),
		}),
		ResourceModule.forRoot([
			{ entity: Weapon, route: 'weapons' },
			{ entity: Attachment, route: 'attachments' },
			Gear,
			Clothing,
		]),
		ArmoryModule,
		LoadoutModule,
		EventModule,
	],
	controllers: [AppController],
	providers: [Logger, { provide: APP_GUARD, useClass: FirebaseAuthGuard }],
})
export class AppModule {}
