import { EntityManager } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Injectable, Logger, MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'

import { FirebaseModule, FirebaseUserService } from './firebase'
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
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserFilterMiddleware).forRoutes('*')
	}
}

// Not sure how to do this properly.. Could potentially be a case where a user persists
// The EM should be scoped to the request, but idk why it isnt? The instance is shared
// across requests.. This shouldnt happen so idk why it is
// https://mikro-orm.io/docs/identity-map/#forking-entity-manager
@Injectable()
export class UserFilterMiddleware implements NestMiddleware {
	constructor(private user: FirebaseUserService, private em: EntityManager) {}

	use(req: Request, res: Response, next: NextFunction) {
		this.em.setFilterParams('forUser', { uid: this.user.uid })
		next()
	}
}
