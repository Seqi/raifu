import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CreateResourceDto {
	@IsNotEmpty()
	@MaxLength(64)
	platform!: string

	@IsOptional()
	@IsNotEmpty()
	@MaxLength(64)
	model?: string

	@IsOptional()
	@IsNotEmpty()
	@MaxLength(64)
	brand?: string

	@IsOptional()
	@IsNotEmpty()
	@MaxLength(64)
	nickname?: string

	@IsNotEmpty()
	@MaxLength(16)
	type!: string
}
