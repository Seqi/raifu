import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import BigCalendar from 'react-big-calendar' 
import moment from 'moment'

import { withTheme } from '@material-ui/core'

import CalendarToolbar from './CalendarToolbar'
import CalendarEvent from './CalendarEvent'
import EditEventDialog from './EditEventDialog'

import Loader from 'app/shared/components/Loader'

import database from '../../../firebase/database'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

class Events extends React.Component {

	constructor() {
		super()

		this.state = {
			events: [],
			loading: true,
			activeTimeslot: null,
			isAddDialogOpen: false
		}

		this.localizer = BigCalendar.momentLocalizer(moment)
	}

	componentDidMount() {
		database.events.get()
			.then(events => {
				if (!this.unmounted) {
					this.setState({ events: events, loading: false })
				}
			})
	}

	componentWillUnmount() {
		this.unmounted = false
	}

	timeSlotClicked(timeslot) {
		// Set the time to 8am for a common start, otherwise we're left at 12am
		// Use the end as if they click dragged we use the last day they moused on
		let date = new Date(timeslot.end)
		let startTime = date.setHours(8)

		this.setState({ activeTimeslot: new Date(startTime), isAddDialogOpen: true })
	}

	closeDialog() {
		this.setState({ activeTimeslot: null, isAddDialogOpen: false })
	}

	view(event) {
		this.props.history.push(`${this.props.location.pathname}/${event.id}`)
	}

	save(value) {
		database.events
			.add(value)
			.then((event) => this.setState((prevState) => ({ events: prevState.events.concat(event) })))
			.then(() => this.closeDialog())
	}

	formatDateThenSave(event) {
		// Firebase functions don't like date objects...
		if (event.date) {
			event.date = event.date.toISOString()
		}

		this.save(event)
	}

	styleEvent = (e) => {
		return {
			style: {
				border: `1px solid ${this.props.theme.palette.primary.main}`,
				background: 'inherit',
			}
		}
	}

	render() {
		let { loading, events, activeTimeslot, isAddDialogOpen } = this.state

		if (loading) {
			return <Loader />
		}

		return (
			<React.Fragment>
				<div style={ {height: '80%'} }>
					<BigCalendar localizer={ this.localizer } 
						style={ {
							color: this.props.theme.palette.text.primary
						} }
						titleAccessor={ e => e.name }
						startAccessor={ e => e.date }
						endAccessor={ e => e.date }
						views={ ['month'] }
						getDrilldownView={ _ => null }
						components={ {
							toolbar: CalendarToolbar,
							event: CalendarEvent
						} }
						selectable={ true }
						onSelectSlot={ slot => this.timeSlotClicked(slot) }
						eventPropGetter={ this.styleEvent }
						events={ events }
						onSelectEvent={ event => this.view(event) }
					/>
				</div>

				{ activeTimeslot && <EditEventDialog 
					date={ activeTimeslot }
					onSave={ value => this.formatDateThenSave(value) } 
					onClose={ () => this.closeDialog() }
					isOpen={ isAddDialogOpen } 
				/> }
			</React.Fragment>			
		)
	}
}

export default withTheme()(withRouter(Events))