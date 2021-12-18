import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, IsBoolean } from 'class-validator'

export class CreateLoadoutDto {
	@IsNotEmpty()
	@MaxLength(64)
	name!: string

	@IsBoolean()
	shared: boolean
}

export class UpdateLoadoutDto extends PartialType(CreateLoadoutDto) {}
