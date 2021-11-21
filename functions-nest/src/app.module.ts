import { EntityManager } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import {
	Injectable,
	Logger,
	MiddlewareConsumer,
	Module,
	NestMiddleware,
} from '@nestjs/common'
import { NextFunction } from 'express'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { FirebaseModule } from './firebase'
import { FirebaseUserService } from './firebase/services/firebase-user.service'
import { WeaponModule } from './weapon/weapon.module'

@Module({
	imports: [FirebaseModule.forRoot(), MikroOrmModule.forRoot(), WeaponModule],
	controllers: [AppController],
	providers: [AppService, Logger],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserFilterMiddleware).forRoutes('*')
	}
}

// Not sure how to do this properly, but this will attach the request-scoped object
// so that a previous filter will never remain attached.
// The EM should be scoped to the request, but idk why it isnt? The instance is shared
// across requests.. This shouldnt happen so idk why it is
// https://mikro-orm.io/docs/identity-map/#forking-entity-manager
@Injectable()
export class UserFilterMiddleware implements NestMiddleware {
	constructor(private user: FirebaseUserService, private em: EntityManager) {}

	use(req: Request, res: Response, next: NextFunction) {
		this.em.setFilterParams('test', { uid: this.user })
		next()
	}
}