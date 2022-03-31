import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from '@material-ui/core'
import moment from 'moment'

import { events } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

import firebase from '../../../../../firebase'
import { EventUpdate } from '../EditEventDialog'
import { Event } from '../../models'
import EventContent from './EventContent'
import EventActions from './EventActions'

const analytics = firebase.analytics()

type EventProps = {
	params: { id: string }
	navigate: any
}

type EventState = {
	loading: boolean
	error: any
	event: Event | null
}

// TODO: Add Proptypes
class EventDetails extends React.Component<EventProps, EventState> {
	private isUnmounted = false

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
				.getById(this.props.params.id)
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
			date: event.date.toISOString(),
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
				const prevEvent = this.state.event

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
			.then(() => this.props.navigate('/events'))
	}

	leaveEvent() {
		return events
			.leave(this.state.event!.id)
			.then(() => analytics.logEvent('event_left'))
			.then(() => this.props.navigate('/events'))
	}

	setLoadout(loadoutId: string) {
		const eventId = this.state.event!.id

		return (
			events
				.setLoadout(eventId, loadoutId)
				// TODO: Fix type
				.then((event: any) => this.setState({ event }))
				.then(() => analytics.logEvent('event_loadout_added'))
		)
	}

	removeLoadout() {
		const eventId = this.state.event!.id

		return events
			.removeLoadout(eventId)
			.then((event: any) => this.setState({ event }))
			.then(() => analytics.logEvent('event_loadout_removed'))
	}

	render() {
		const { loading, error, event } = this.state

		if (loading) {
			return <LoadingOverlay />
		}

		if (error) {
			if (error.status === 404) {
				return <ErrorOverlay message='Event not found.' icon='fa fa-crosshairs' />
			}

			return (
				<ErrorOverlay message='Could not load event.' onRetry={() => this.loadEvent()} />
			)
		}

		if (!event) {
			return (
				<ErrorOverlay message='Could not load event.' onRetry={() => this.loadEvent()} />
			)
		}

		const eventDate = moment(event.date)

		return (
			<Box display='flex' flexDirection='row'>
				<SidewaysTitle
					mr={{ xs: 1, sm: 2 }}
					title={event.getTitle()}
					subtitle={`${event.location} ${eventDate.fromNow()}`}
					lowercase={true}
				/>

				<EventContent
					event={event}
					onEventJoined={() => this.loadEvent()}
					onLoadoutAdded={(loadoutId: string) => this.setLoadout(loadoutId)}
					onLoadoutRemoved={() => this.removeLoadout()}
				/>

				<EventActions
					event={event}
					updateEvent={(evt) => this.updateEvent(evt)}
					deleteEvent={() => this.deleteEvent()}
					leaveEvent={() => this.leaveEvent()}
				/>
			</Box>
		)
	}
}

// Before moving to functional compnoents
function withParams(Component: React.ComponentType<any>) {
	// eslint-disable-next-line
	return (props: any) => <Component { ...props } params={ useParams() } />
}
// Before moving to functional compnoents
function withNavigate(Component: React.ComponentType<any>) {
	// eslint-disable-next-line
	return (props: any) => <Component { ...props } navigate={ useNavigate() } />
}

export default withParams(withNavigate(EventDetails))
