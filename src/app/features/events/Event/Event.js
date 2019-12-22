import React from 'react'

import { Loading, Error } from 'app/shared'

import EventHeader from './EventHeader'
import EventLoadout from './EventLoadout'
import database from '../../../../firebase/database'
import EventLoadoutSelect from './EventLoadoutSelect'
import EventInvite from './EventInvite'
import EventUserSelect from './EventUserSelect'

class Event extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			error: null,
			event: null,
			activeUserIndex: 0
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

	get currentUsersEvent() {
		return this.state.event && this.state.event.users[this.state.activeUserIndex]
	}

	get currentUserIsSelf() {
		return this.state.activeUserIndex === 0
	}

	componentDidMount() {	
		this.loadEvent()	
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	// TODO: Move this to the service itself
	formatEvent(event) {
		return {
			...event,
			date: new Date(event.date)
		}
	}

	loadEvent() {
		this.setState({loading: true, error: null}, () => {
			database.events.getById(this.props.match.params.id)
				// Convert from JSON date format
				.then(this.formatEvent)
				.then(event => {
					if (!this.isUnmounted) {
						this.setState({ event: event, loading: false })
					}
				})
				.catch(err => {
					if (!this.isUnmounted) {
						this.setState({ error: 'An error occurred while loading event.', loading: false})
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

		return database.events.edit(this.state.event.id, updatedEvent)
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
		return database.events.delete(this.state.event.id)
			.then(() => this.props.history.push('/events'))
	}

	setLoadout(loadoutId) {
		let eventId = this.state.event.id

		return database.events.setLoadout(eventId, loadoutId)
			.then(this.formatEvent)
			.then(event => this.setState({ event }))
	}

	removeLoadout() {
		let eventId = this.state.event.id

		return database.events.removeLoadout(eventId)
			.then(this.formatEvent)
			.then(event => this.setState({ event }))
	}

	onActiveUserChange(userIndex) {
		this.setState({ activeUserIndex: userIndex })
	}
	
	render() {
		let { loading, error, event, activeUserIndex } = this.state

		if (loading) {			
			return <Loading />
		}
	
		if (error) {
			return <Error error={ error } onRetry={ () => this.loadEvent() } />
		}

		return (
			<React.Fragment>
				<EventHeader 
					event={ event } 
					updateEvent={ (event) => this.updateEvent(event) }
					deleteEvent={ () => this.deleteEvent() }
				/>

				{ event.users.length > 1 && 
					<EventUserSelect event={ event } userIndex={ activeUserIndex } onUserIndexChange={ (idx) => this.onActiveUserChange(idx) } />
				}

				{	event.users.length === 0 ? 
					<EventInvite event={ event } onJoin={ () => this.loadEvent() } /> :

					this.currentUsersEvent.loadout ?
						<EventLoadout event={ event } activeUserIndex={ activeUserIndex } removeLoadout={ () => this.removeLoadout() } /> :
						this.currentUserIsSelf ? 
							<EventLoadoutSelect event={ event } setLoadout={ (loadoutId) => this.setLoadout(loadoutId) } /> :
							<div style={ {textAlign: 'center' } }>User has not added a loadout to this event.</div>
				}
			</React.Fragment>
		)
	}
}

export default Event