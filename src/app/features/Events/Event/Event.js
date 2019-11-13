import React from 'react'
import withRouter from 'react-router-dom/withRouter'

import Button from '@material-ui/core/Button'

import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import LoadoutSeparator from 'app/shared/components/Views/Loadout/LoadoutSeparator'
import LoadoutAdd from 'app/shared/components/Views/Loadout/LoadoutAdd'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import { Loading, Error } from 'app/shared/components'

import AddLoadoutToEventDialog from './AddLoadoutToEventDialog/AddLoadoutToEventDialog'

import database from '../../../../firebase/database'
import EventActions from './EventActions'

class Event extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			error: null,
			activeDialog: null,
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

	get currentUsersEvent() {
		return this.state.event && this.state.event.users[0]
	}

	componentDidMount() {	
		this.loadEvent()	
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}	

	loadEvent() {
		this.setState({loading: true, error: null}, () => {
			database.events.getById(this.props.match.params.id)
				// Convert from JSON date format
				.then(event => ({
					...event,
					date: new Date(event.date)
				}))
				.then(event => {
					if (!this.isUnmounted) {
						this.setState({ event: event, loading: false })
					}
				})
				.catch(err => {
					if (!this.isUnmounted) {
						this.setState({ error: err.statusText || err.message || err, loading: false})
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
						loadout: prevState.event.loadout
					}
				}
			}))
			.then(() => this.openDialog(null))
	}

	deleteEvent() {
		return database.events.delete(this.state.event.id)
			.then(() => this.props.history.push('/events'))
	}

	setLoadout(loadoutId) {
		let eventId = this.state.event.id

		return database.events.setLoadout(eventId, loadoutId)
			.then(event => this.setState({ event }))
			.then(() => this.openDialog(null))
	}

	removeLoadout() {
		let eventId = this.state.event.id

		return database.events.removeLoadout(eventId)
			.then(event => this.setState({ event }))
			.then(() => this.openDialog(null))
	}

	openDialog(activeDialog) {
		this.setState({ activeDialog })
	}
	
	render() {
		let { loading, error, event, activeDialog } = this.state

		if (loading) {			
			return <Loading />
		}
	
		if (error) {
			return <Error error={ error } onRetry={ () => this.loadEvent() } />
		}

		return (
			<React.Fragment>
				<EventActions 
					event={ event } 
					updateEvent={ (event) => this.updateEvent(event) }
					deleteEvent={ () => this.deleteEvent() }
				/>

				{ !this.currentUsersEvent.loadout && 
					<LoadoutSeparator showBottom={ true } >
						<LoadoutAdd onClick={ () => this.openDialog('add') } />
					</LoadoutSeparator>
				}

				{ this.currentUsersEvent.loadout && 
				<div style={ {width: '100%'} }>
					<Button 
						color='primary' 
						variant='outlined'
						style={ {
							width: '100%',
							marginBottom: '-24px'
						} }
						onClick={ () => this.openDialog('remove') }
					>
						Remove Loadout ({ this.currentUsersEvent.loadout.getTitle() })
					</Button>
					
					<LoadoutView loadout={ this.currentUsersEvent.loadout } /> 

					<ConfirmDeleteDialog 
						verb='Remove'
						title={ `${this.currentUsersEvent.loadout.getTitle()} from ${event.getTitle()}` }
						isOpen={ activeDialog === 'remove' }
						onClose={ () => this.openDialog(null) }
						onConfirm={ () => this.removeLoadout(null) }
					/>
				</div>
				}

				<AddLoadoutToEventDialog 
					eventTitle={ event.getTitle() }
					isOpen={ activeDialog === 'add' }
					onSave={ (loadoutId) => this.setLoadout(loadoutId) }
					onClose={ () => this.openDialog(null) } />
			</React.Fragment>
		)
	}
}

export default withRouter(Event)