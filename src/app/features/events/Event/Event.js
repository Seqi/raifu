import React from 'react'

import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'

import EventHeader from './EventHeader'
import EventContent from './EventContent'
import EventActions from './EventActions' 

import { events } from 'app/data/api'

class Event extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			error: null,
			event: null
		}
	}

	get rawEvent() {
		let event = this.state.event

		// Filter out any functions or joins before passing back up to api
		return Object.keys(event)
			.reduce((p, c) => {
				if (typeof event[c] !== 'function' && typeof event[c] !== 'object' && c !== 'loadout') {
					p[c] = event[c]
				}

				return p
			}, { loadout_id: event.loadout ? event.loadout.id : null })
	}

	componentDidMount() {	
		this.loadEvent()	
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	loadEvent() {
		this.setState({ event: null, loading: true, error: null }, () => {
			events.getById(this.props.match.params.id)
				// Convert from JSON date format
				.then(this.formatEvent)
				.then(event => {
					if (!this.isUnmounted) {
						this.setState({ event: event, loading: false })
					}
				})
				.catch(err => {
					if (!this.isUnmounted) {
						this.setState({ error: err, loading: false})
					}
				})
		})
	}

	updateEvent(event) {
		let updatedEvent = {
			...this.rawEvent,
			...event
		}

		// Firebase functions don't like date objects...
		if (updatedEvent.date) {
			updatedEvent.date = updatedEvent.date.toISOString()
		}

		return events.edit(this.state.event.id, updatedEvent)
			.then(() => this.setState((prevState) => {
				return {
					event: {
						...prevState.event, 
						...event,
						date: new Date(event.date),
						loadout: prevState.event.loadout
					}
				}
			}))
	}

	deleteEvent() {
		return events.delete(this.state.event.id)
			.then(() => this.props.history.push('/events'))
	}

	setLoadout(loadoutId) {
		let eventId = this.state.event.id

		return events.setLoadout(eventId, loadoutId)
			.then(event => this.setState({ event }))
	}

	removeLoadout() {
		let eventId = this.state.event.id

		return events.removeLoadout(eventId)
			.then(event => this.setState({ event }))
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

			return <ErrorOverlay message='Could not load event.' onRetry={ () => this.loadEvent() } />
		}

		return (
			<React.Fragment>
				<EventHeader event={ event } />

				<EventContent 
					event={ event }
					onEventJoined={ () => this.loadEvent() }
					onLoadoutAdded={ (loadoutId) => this.setLoadout(loadoutId) }
					onLoadoutRemoved={ () => this.removeLoadout() }
				/>

				<EventActions 
					event={ event } 
					updateEvent={ evt => this.updateEvent(evt) } 
					deleteEvent={ () => this.deleteEvent() }
				/>
			</React.Fragment>
		)
	}
}

export default Event