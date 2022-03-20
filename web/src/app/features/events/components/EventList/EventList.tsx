import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
	Fab,
	Box,
	styled,
	withTheme,
	withWidth,
	isWidthDown,
	WithWidthProps,
} from '@material-ui/core'

import { events } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'

import { EditEventDialog, EventUpdate } from '../EditEventDialog'
import firebase from '../../../../../firebase'
import { Event } from '../../models'
import EventWeeklyView from './WeeklyView/EventWeeklyView'
import EventCalendarView from './CalendarView/EventCalendarView'
import CalendarDateContextProvider from './CalendarDateContextProvider'

let analytics = firebase.analytics()

const EventListContainer = styled(Box)({
	height: '75vh',
})

const EventFab = styled(Fab)({
	position: 'fixed',
	bottom: '2%',
	right: '3%',
})

type EventListProps = WithWidthProps & {
	navigate: any
	location: any
}

type EventListState = {
	events: Event[]
	loading: boolean
	error: boolean
	activeTimeslot: Date | null
	isAddDialogOpen: boolean
}

class EventList extends React.Component<EventListProps, EventListState> {
	private unmounted: boolean = false

	constructor(props: EventListProps) {
		super(props)

		this.state = {
			events: [],
			loading: true,
			error: false,
			activeTimeslot: null,
			isAddDialogOpen: false,
		}
	}

	componentDidMount() {
		this.loadEvents()
	}

	componentWillUnmount() {
		this.unmounted = true
	}

	loadEvents() {
		if (this.unmounted) {
			return
		}

		this.setState({ loading: true, error: false }, () => {
			events
				.get()
				.then((events) => {
					if (!this.unmounted) {
						this.setState({ events: events, error: false, loading: false })
					}
				})
				.catch((err) => {
					if (!this.unmounted) {
						this.setState({ error: true, loading: false })
					}
				})
		})
	}

	addEvent(date = new Date()) {
		// Set the time to 8am for a common start, otherwise we're left at 12am
		let startTime = date.setHours(8, 0, 0, 0)

		this.setState({ activeTimeslot: new Date(startTime), isAddDialogOpen: true })
	}

	closeDialog() {
		this.setState({ activeTimeslot: null, isAddDialogOpen: false })
	}

	view(event: Event) {
		this.props.navigate(`${this.props.location.pathname}/${event.id}`)
	}

	save(event: EventUpdate) {
		return events
			.add({
				...event,
				// Firebase functions don't like date objects...
				date: event.date?.toISOString(),
			})
			.then((event) =>
				this.setState((prevState) => ({ events: prevState.events.concat(event) }))
			)
			.then(() => analytics.logEvent('event_added'))
			.then(() => this.closeDialog())
	}

	render() {
		let { loading, error, events, activeTimeslot, isAddDialogOpen } = this.state
		let { width } = this.props

		if (loading) {
			return <LoadingOverlay />
		}

		if (error) {
			return (
				<ErrorOverlay
					message='Could not load events.'
					onRetry={() => this.loadEvents()}
				/>
			)
		}

		const EventListView =
			width && isWidthDown('sm', width) ? EventWeeklyView : EventCalendarView

		return (
			<>
				<EventListContainer>
					<CalendarDateContextProvider>
						<EventListView
							events={events}
							onEventSelected={(event) => this.view(event)}
							onSlotSelected={(date) => this.addEvent(date)}
						/>
					</CalendarDateContextProvider>
				</EventListContainer>

				<EventFab onClick={() => this.addEvent()} color='primary' aria-label='Add'>
					<i className='fa fa-plus' />
				</EventFab>

				{activeTimeslot && (
					<EditEventDialog
						date={activeTimeslot}
						onSave={(value) => this.save(value)}
						onClose={() => this.closeDialog()}
						isOpen={isAddDialogOpen}
					/>
				)}
			</>
		)
	}
}

// Before moving to functional compnoents
function withLocation(Component: React.ComponentType<any>) {
	// eslint-disable-next-line
	return (props: any) => <Component { ...props } location={ useLocation() } />
}

// Before moving to functional compnoents
function withNavigate(Component: React.ComponentType<any>) {
	// eslint-disable-next-line
	return (props: any) => <Component { ...props } navigate={ useNavigate() } />
}

export default withWidth()(withTheme(withLocation(withNavigate(EventList))))
