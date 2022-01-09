import { OmitType, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, IsBoolean, IsDate } from 'class-validator'
import { Event, EventUser } from 'src/entities'
import { ViewLoadoutDto } from '../loadout/loadout.dto'

export class CreateEventDto {
	@IsNotEmpty()
	@MaxLength(256)
	name!: string

	@IsNotEmpty()
	@MaxLength(256)
	location!: string

	@IsBoolean()
	public: boolean

	@IsDate()
	date: Date
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}

export class ViewEventDto extends OmitType(Event, ['users']) {
	users: ViewEventUserDto[]
	owner?: boolean
	isGroup?: boolean
}

export class ViewEventUserDto extends OmitType(EventUser, ['loadout']) {
	displayName: string
	loadout?: ViewLoadoutDto
}
