import { SetMetadata } from '@nestjs/common'
import { ALLOW_ANON_TOKEN } from './constants'

export const AllowAnonymous = () => SetMetadata(ALLOW_ANON_TOKEN, true)
