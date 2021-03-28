import React from 'react'
import { RouteChildrenProps } from 'react-router'

import { events } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import firebase from '../../../../../firebase'

import EventHeader from './EventHeader'
import EventContent from './EventContent'
import EventActions from './EventActions'

import { EventUpdate } from '../EditEventDialog'
import { Event } from '../../models'

let analytics = firebase.analytics()

type EventProps = RouteChildrenProps<{ id: string }>

type EventState = {
	loading: boolean
	error: any
	event: Event | null
}

//TODO: Add Proptypes
class EventDetails extends React.Component<EventProps, EventState> {
	private isUnmounted: boolean = false

	constructor(props: EventProps) {
		super(props)

		this.state = {
			loading: true,
			error: null,
			event: null,
		}
	}

	componentDidMount() {
		this.loadEvent()
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	loadEvent() {
		this.setState({ event: null, loading: true, error: null }, () => {
			events
				.getById(this.props.match!.params.id)
				.then((event) => {
					if (!this.isUnmounted) {
						this.setState({ event: event, loading: false })
					}
				})
				.catch((err) => {
					if (!this.isUnmounted) {
						this.setState({ error: err, loading: false })
					}
				})
		})
	}

	updateEvent(event: EventUpdate) {
		const update = {
			name: event.name,
			location: event.location,
			date: event.date?.toISOString(),
			public: event.public,
			loadout_id: event.loadout?.id,
		}

		return events
			.edit(this.state.event!.id, update)
			.then(() =>
				// TODO: Type
				this.setState((prevState: any) => {
					return {
						event: {
							...prevState.event,
							...event,
							date: new Date(event.date),
							loadout: prevState.event?.loadout,
						},
					}
				})
			)
			.then(() => {
				let analyticsEvent
				let prevEvent = this.state.event

				if (!prevEvent!.public && update.public) {
					analyticsEvent = 'event_public'
				} else if (prevEvent!.public && !update.public) {
					analyticsEvent = 'event_private'
				} else {
					analyticsEvent = 'event_updated'
				}

				analytics.logEvent(analyticsEvent)
			})
	}

	deleteEvent() {
		return events
			.delete(this.state.event!.id)
			.then(() => analytics.logEvent('event_deleted'))
			.then(() => this.props.history.push('/events'))
	}

	leaveEvent() {
		return events
			.leave(this.state.event!.id)
			.then(() => analytics.logEvent('event_left'))
			.then(() => this.props.history.push('/events'))
	}

	setLoadout(loadoutId: string) {
		let eventId = this.state.event!.id

		return (
			events
				.setLoadout(eventId, loadoutId)
				// TODO: Fix type
				.then((event: any) => this.setState({ event }))
				.then(() => analytics.logEvent('event_loadout_added'))
		)
	}

	removeLoadout() {
		let eventId = this.state.event!.id

		return events
			.removeLoadout(eventId)
			.then((event: any) => this.setState({ event }))
			.then(() => analytics.logEvent('event_loadout_removed'))
	}

	render() {
		let { loading, error, event } = this.state

		if (loading) {
			return <LoadingOverlay />
		}

		if (error) {
			if (error.status === 404) {
				return <ErrorOverlay message='Event not found.' icon='fa fa-crosshairs' />
			}

			return (
				<ErrorOverlay message='Could not load event.' onRetry={ () => this.loadEvent() } />
			)
		}

		return (
			<React.Fragment>
				<EventHeader event={ event! } />

				<EventContent
					event={ event! }
					onEventJoined={ () => this.loadEvent() }
					onLoadoutAdded={ (loadoutId: string) => this.setLoadout(loadoutId) }
					onLoadoutRemoved={ () => this.removeLoadout() }
				/>

				<EventActions
					event={ event! }
					updateEvent={ (evt) => this.updateEvent(evt) }
					deleteEvent={ () => this.deleteEvent() }
					leaveEvent={ () => this.leaveEvent() }
				/>
			</React.Fragment>
		)
	}
}

export default EventDetails
