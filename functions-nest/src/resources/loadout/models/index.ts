import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
export { Loadout } from 'src/entities'

export class CreateLoadoutDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsBoolean()
	@IsOptional()
	shared?: boolean
}
