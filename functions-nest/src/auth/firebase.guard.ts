import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { STRATEGY_NAME } from './constants'

export const FirebaseAuthGuard = () => UseGuards(AuthGuard(STRATEGY_NAME))
