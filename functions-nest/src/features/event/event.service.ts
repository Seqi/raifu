import { EntityRepository, QueryOrder } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'

import { Auth } from 'firebase-admin/auth'

import { Event, EventUser, Loadout } from 'src/entities'
import { FirebaseAuth } from 'src/firebase'
import { UserService } from 'src/auth'
import { CreateEventDto, UpdateEventDto, ViewEventDto, ViewEventUserDto } from './event.dto'
import { ViewLoadoutDto } from '../loadout'

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event) private repo: EntityRepository<Event>,
		@InjectRepository(EventUser) private eventUsers: EntityRepository<EventUser>,
		@InjectRepository(Loadout) private loadoutRepo: EntityRepository<Loadout>,
		private user: UserService,
		@Inject(FirebaseAuth) private auth: Auth,
	) {}

	async getAll(): Promise<Event[]> {
		// TODO: Remove uid from result
		const result = await this.repo.find(
			{
				users: {
					uid: this.user.uid,
				},
			},
			{
				orderBy: { createdAt: QueryOrder.ASC },
				populate: {
					users: {
						loadout: {
							weapons: {
								attachments: true,
							},
							gear: true,
							clothing: true,
						},
					},
				},
			},
		)

		return result
	}

	async getById(id: string): Promise<ViewEventDto> {
		const event = await this.repo.findOne(
			{
				id,
				$or: [
					{ public: true },
					{
						users: {
							uid: this.user.uid,
						},
					},
				],
			},
			{
				orderBy: { createdAt: QueryOrder.ASC },
				populate: {
					users: {
						loadout: {
							weapons: {
								attachments: true,
							},
							gear: true,
							clothing: true,
						},
					},
				},
			},
		)

		const currentUserIndex = event.users.getItems().findIndex((user) => user.uid === this.user.uid)

		// If its a public event where the user doesnt exist on it, don't show the users info
		if (currentUserIndex < 0) {
			return {
				...event,
				users: [],
			}
		}

		// Move the current user to the front
		const users: ViewEventUserDto[] = await Promise.all(
			event.users.getSnapshot().map(async (user): Promise<ViewEventUserDto> => {
				const fbUser = await this.auth.getUser(user.uid)
				const dtoUser: ViewEventUserDto = {
					...user,
					displayName: fbUser.displayName || fbUser.email,
					loadout: user.loadout && ViewLoadoutDto.fromLoadout(user.loadout),
				}

				return dtoUser
			}),
		)

		users.unshift(users.splice(currentUserIndex, 1)[0])

		return {
			...event,
			users,
			owner: event.organiserUid === this.user.uid,
			isGroup: event.users.length > 1,
		}
	}

	async add(dto: CreateEventDto): Promise<Event> {
		// TODO: Validate no id being sent in at controller
		const event = this.repo.create({ uid: this.user.uid, ...dto, organiserUid: this.user.uid })
		const eventUser = new EventUser()
		eventUser.uid = this.user.uid

		event.users.add(eventUser)

		this.repo.persistAndFlush(event)

		return event
	}

	async update(id: string, dto: UpdateEventDto): Promise<void> {
		const event = await this.repo.findOne({ id, organiserUid: this.user.uid })

		if (!event) {
			throw new NotFoundException()
		}

		Object.apply(event, dto)
		this.repo.flush()
	}

	async remove(id: string): Promise<void> {
		const itemsDeleted = await this.repo.nativeDelete({ id, organiserUid: this.user.uid })

		if (itemsDeleted < 1) {
			throw new NotFoundException()
		}
	}

	async setLoadout(id: string, loadoutId: string | null): Promise<Loadout | null> {
		const eventUser = await this.eventUsers.findOne(
			{
				uid: this.user.uid,
				event: {
					id: id,
				},
			},
			{ loadout: true },
		)

		if (!eventUser) {
			throw new NotFoundException('Event not found.')
		}

		// Set the loadout
		if (loadoutId === null) {
			eventUser.loadout = null
			this.repo.flush()

			return null
		} else {
			const loadout = await this.loadoutRepo.findOne({
				id: loadoutId,
				uid: this.user.uid,
			})

			if (!loadout) {
				throw new NotFoundException('Could not find loadout.')
			}

			eventUser.loadout = loadout
			this.repo.flush()

			return loadout
		}
	}

	async join(id: string): Promise<void> {
		const event = await this.repo.findOne({ id, public: true })

		if (!event) {
			throw new NotFoundException()
		}

		// Try and grab this user in the event to see if they're either
		// already apart of it - or have been before but left anad are rejoining
		const eventUser = (await event.users.matching({ having: { uid: this.user.uid } }))[0]

		// Create the event user if doesn't exist
		if (!eventUser) {
			const newUser = new EventUser(this.user.uid)
			event.users.add(newUser)
		}

		// Do nothing if theyve already joined
		else if (!eventUser.deletedAt) {
			return
		}

		// Reactivate if they joined and left
		else if (eventUser?.deletedAt) {
			eventUser.deletedAt = null
		}

		this.repo.flush()
	}

	async leave(id: string): Promise<void> {
		const event = await this.repo.findOne({ id, users: { uid: this.user.uid } })

		if (!event) {
			throw new NotFoundException()
		}

		if (event.organiserUid === this.user.uid) {
			throw new BadRequestException('Cannot leave an event you are the organiser of.')
		}

		const eventUser = (await event.users.matching({ having: { uid: this.user.uid } }))[0]

		// Do nothing if theyve already left
		if (eventUser.deletedAt) {
			return
		}

		// Deactivate!!!
		else if (eventUser?.deletedAt) {
			eventUser.deletedAt = new Date()
		}

		this.repo.flush()
	}
}
