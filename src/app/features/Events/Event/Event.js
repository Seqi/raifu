import React from 'react'

import Typography from '@material-ui/core/Typography'

import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import LoadoutSeparator from 'app/shared/components/Views/Loadout/LoadoutSeparator'
import LoadoutAdd from 'app/shared/components/Views/Loadout/LoadoutAdd'
import Loader from 'app/shared/components/Loader'

import EditEventDialog from '../EditEventDialog'
import AddLoadoutToEventDialog from './AddLoadoutToEventDialog/AddLoadoutToEventDialog'

import database from '../../../../firebase/database'

export default class Event extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true,
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

	componentDidMount() {		
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
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}	

	openDialog(activeDialog) {
		this.setState({ activeDialog })
	}

	setLoadout(loadout) {
		// Filter out any functions or joins before passing back up
		let updatedEvent = this.rawEvent
		this.rawEvent.loadout_id = loadout ? loadout.id : null

		database.events.edit(updatedEvent)
			.then(() => this.setState((prevState) => {
				return {
					event: {...prevState.event, loadout: loadout}
				}
			}))
			.then(() => this.openDialog(null))
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

		database.events.edit(updatedEvent)
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

	render() {
		let { loading, error, event, activeDialog } = this.state

		if (loading) {			
			return <Loader />
		}
	
		if (error) {
			return <div className='error-alert'>Error: {error}</div>
		}

		return (
			<React.Fragment>
				<React.Fragment>
					<Typography variant='h3' >
						{ event.getTitle() }
						<i onClick={ () => this.openDialog('edit') } className='fa fa-pen icon-action' />
					</Typography>

					<Typography variant='h4'>
						{ event.getSubtitle() }
					</Typography>
				</React.Fragment>

				{ !event.loadout && 
					<LoadoutSeparator showBottom={ true } >
						<LoadoutAdd onClick={ () => this.openDialog('add') } />
					</LoadoutSeparator>
				}

				{ event.loadout && <LoadoutView loadout={ event.loadout } /> }

				<AddLoadoutToEventDialog 
					eventTitle={ event.getTitle() }
					isOpen={ activeDialog === 'add' }
					onSave={ (loadoutId) => this.setLoadout(loadoutId) }
					onClose={ () => this.openDialog(null) } />

				<EditEventDialog 
					event={ event }
					isOpen={ activeDialog === 'edit' }
					onSave={ (event) => this.updateEvent(event) }
					onClose={ () => this.openDialog(null) } />
			</React.Fragment>
		)
	}
}
