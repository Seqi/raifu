import React from 'react'

import Typography from '@material-ui/core/Typography'

import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import LoadoutSeparator from 'app/shared/components/Views/Loadout/LoadoutSeparator'
import LoadoutAdd from 'app/shared/components/Views/Loadout/LoadoutAdd'
import Loader from 'app/shared/components/Loader'
import AddLoadoutToEventDialog from './AddLoadoutToEventDialog'

import database from '../../../../firebase/database'

export default class Event extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			isDialogOpen: false,
			event: null
		}
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

	openDialog(isDialogOpen) {
		this.setState({ isDialogOpen })
	}

	setLoadout(loadout) {
		let event = this.state.event

		// Filter out any functions or joins before passing back up
		let updatedEvent = Object.keys(event)
			.reduce((p, c) => {
				if (typeof event[c] !== 'function' && typeof event[c] !== 'object' && c !== 'loadout') {
					p[c] = event[c]
				}

				return p
			}, { loadout_id: loadout ? loadout.id : null })

		database.events.edit(updatedEvent)
			.then(() => this.setState((prevState) => {
				return {
					event: {...prevState.event, loadout: loadout}
				}
			}))
			.then(() => this.openDialog(false))
	}

	render() {
		let { loading, error, event, isDialogOpen } = this.state

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
						<i onClick={ () => this.openDialog(true) } className='fa fa-pen icon-action' />
					</Typography>

					<Typography variant='h4'>
						{ event.location } @ { event.date.toLocaleString() }
					</Typography>
				</React.Fragment>

				{ !event.loadout && 
					<LoadoutSeparator showBottom={ true } >
						<LoadoutAdd onClick={ () => this.openDialog(true) } />
					</LoadoutSeparator>
				}

				{ event.loadout && <LoadoutView loadout={ event.loadout } /> }

				<AddLoadoutToEventDialog 
					eventTitle={ event.getTitle() }
					isOpen={ isDialogOpen }
					onSave={ (loadoutId) => this.setLoadout(loadoutId) }
					onClose={ () => this.openDialog(false) } />
			</React.Fragment>
		)
	}
}
