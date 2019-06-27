import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import BigCalendar from 'react-big-calendar' 
import moment from 'moment'

import { withTheme } from '@material-ui/core'

import CalendarToolbar from './CalendarToolbar'
import CalendarEvent from './CalendarEvent'
import CalendarAgendaEvent from './CalendarAgendaEvent'
import EditEventDialog from './EditEventDialog'

import { Loading, Error } from 'app/shared/components'

import database from '../../../firebase/database'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

class Events extends React.Component {

	constructor() {
		super()

		this.state = {
			events: [],
			view: 'month',
			loading: true,
			error: null,
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
		this.setState({ loading: true, error: null }, () => {
			database.events.get()
				.then(events => {
					if (!this.unmounted) {
						this.setState({ events: events, error: null, loading: false })
					}
				})
				.catch(err => {
					if (!this.unmounted) {
						this.setState({ error: err, loading: false})
					}
				})			
		})
	}

	addEvent(date) {
		// Set the time to 8am for a common start, otherwise we're left at 12am
		let startTime = date.setHours(8)

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

		return database.events
			.add(event)
			.then((event) => this.setState((prevState) => ({ events: prevState.events.concat(event) })))
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
			return <Loading />
		}

		if (error) {
			return <Error message={ error } onRetry={ () => this.loadEvents() } />
		}

		return (
			<React.Fragment>
				<div style={ { height: '80%' } }>
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
				</div>

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

export default withTheme()(withRouter(Events))