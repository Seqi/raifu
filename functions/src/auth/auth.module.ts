import { Global, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FirebaseStrategyService as FirebaseStrategy } from './firebase-strategy.service'
import { UserService } from './user.service'

@Global()
@Module({
	imports: [PassportModule],
	providers: [FirebaseStrategy, UserService],
	exports: [UserService],
})
export class AuthModule {}
