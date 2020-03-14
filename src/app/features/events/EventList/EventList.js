import React from 'react'
import BigCalendar from 'react-big-calendar' 
import moment from 'moment'

import { Fab, Box, styled, withTheme } from '@material-ui/core'

import { events } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { CalendarToolbar, CalendarEvent, CalendarAgendaEvent } from './CalendarComponents'
import EditEventDialog from './EditEventDialog'
import firebase from '../../../../firebase'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarComponents/Calendar.css'

let analytics = firebase.analytics()

const EventListContainer = styled(Box)(({ theme }) => ({
	height: '80vh',
	
	[theme.breakpoints.down('xs')]: {
		height: '70vh',
	},
}))

const EventFab = styled(Fab)({	
	position: 'fixed',
	bottom: '2%',
	right: '3%',
})

class Events extends React.Component {

	constructor() {
		super()

		this.state = {
			events: [],
			view: 'month',
			loading: true,
			error: false,
			activeTimeslot: null,
			isAddDialogOpen: false
		}

		this.localizer = BigCalendar.momentLocalizer(moment)
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
			events.get()
				.then(events => {
					if (!this.unmounted) {
						this.setState({ events: events, error: false, loading: false })
					}
				})
				.catch(err => {
					if (!this.unmounted) {
						this.setState({ error: true, loading: false})
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

	styleEvent = (e) => {
		// Only give month events the accented border as agenda views don't show this right
		if (this.state.view === 'month') {
			return {
				style: {
					border: `1px solid ${this.props.theme.palette.primary.main}`,
					background: 'inherit',
				}
			}
		}
	}

	render() {
		let { loading, error, events, view, activeTimeslot, isAddDialogOpen } = this.state

		if (loading) {
			return <LoadingOverlay />
		}

		if (error) {
			return <ErrorOverlay message='Could not load events.' onRetry={ () => this.loadEvents() } />
		}

		return (
			<React.Fragment>
				<EventListContainer>
					<BigCalendar 
						localizer={ this.localizer } 
						components={ {
							toolbar: CalendarToolbar,
							event: CalendarEvent,
							agenda: {
								event: CalendarAgendaEvent
							}
						} }
						style={ {
							color: this.props.theme.palette.text.primary
						} }
						titleAccessor={ e => e.name }
						startAccessor={ e => e.date }
						endAccessor={ e => e.date }
						defaultView={ view }
						onView={ view => this.setState({ view }) }
						views={ ['month', 'agenda'] }
						// Don't use a drilldown view
						getDrilldownView={ _ => null }
						// Show entire year in agenda view
						length={ 365 }
						selectable={ true }
						onSelectSlot={ slot => this.addEvent(slot.end) }
						events={ events }
						onSelectEvent={ event => this.view(event) }
						eventPropGetter={ this.styleEvent }
					/>
				</EventListContainer>

				<EventFab onClick={ () => this.addEvent() } color='primary' aria-label='Add'>
					<i className='fa fa-plus' />
				</EventFab>

				{ activeTimeslot && <EditEventDialog 
					date={ activeTimeslot }
					onSave={ value => this.save(value) } 
					onClose={ () => this.closeDialog() }
					isOpen={ isAddDialogOpen } 
				/> }
			</React.Fragment>			
		)
	}
}

export default withTheme(Events)