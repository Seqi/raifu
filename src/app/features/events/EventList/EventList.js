import React from 'react'

import { Fab, Box, styled, withTheme } from '@material-ui/core'

import { events } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import EditEventDialog from './EditEventDialog'
import firebase from '../../../../firebase'
import EventCalendarView from './CalendarView/EventCalendarView'

let analytics = firebase.analytics()

const EventListContainer = styled(Box)(({ theme }) => ({
	height: '80vh',

	[theme.breakpoints.down('xs')]: {
		height: '70vh'
	}
}))

const EventFab = styled(Fab)({
	position: 'fixed',
	bottom: '2%',
	right: '3%'
})

class Events extends React.Component {
	constructor() {
		super()

		this.state = {
			events: [],
			loading: true,
			error: false,
			activeTimeslot: null,
			isAddDialogOpen: false
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

	view(event) {
		this.props.history.push(`${this.props.location.pathname}/${event.id}`)
	}

	save(event) {
		// Firebase functions don't like date objects...
		if (event.date) {
			event.date = event.date.toISOString()
		}

		return events
			.add(event)
			.then((event) => this.setState((prevState) => ({ events: prevState.events.concat(event) })))
			.then(() => analytics.logEvent('event_added'))
			.then(() => this.closeDialog())
	}

	render() {
		let { loading, error, events, activeTimeslot, isAddDialogOpen } = this.state

		if (loading) {
			return <LoadingOverlay />
		}

		if (error) {
			return <ErrorOverlay message='Could not load events.' onRetry={() => this.loadEvents()} />
		}

		return (
			<React.Fragment>
				<EventListContainer>
					<EventCalendarView
						events={events}
						onEventSelected={(event) => this.view(event)}
						onSlotSelected={(event) => this.addEvent(event.end)}
					/>
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
			</React.Fragment>
		)
	}
}

export default withTheme(Events)
