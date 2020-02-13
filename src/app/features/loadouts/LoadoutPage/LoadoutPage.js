import React from 'react'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'

import { LoadingOverlay, ErrorOverlay } from 'app/shared'
import { LoadoutView } from 'app/features/loadouts'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'

import { EditLoadoutDialog, SetShareableDialog } from './dialogs'
import database from '../../../../firebase/database'

class LoadoutPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: null,
			activeDialog: null,
			loading: true,
			error: null,
			speedDialOpen: false
		}
	}

	componentDidMount() {
		this.loadLoadout()
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}
	
	loadLoadout() {
		this.setState({ loading: true, error: null }, () => {
			database.loadouts
				.getById(this.props.match.params.id)
				.then((loadout) => {
					if (!this.isUnmounted) {
						this.setState({ loadout, loading: false })
					}
				})
				.catch((err) => {
					if (!this.isUnmounted) {
						this.setState({ error: err, loading: false })
					}
				})
		})
	}

	setDialog(id) {
		this.setState({ activeDialog: id })
	}

	setSpeedDial(open) {
		this.setState({ speedDialOpen: open })
	}

	editLoadout(updatedLoadout) {
		let { loadout } = this.state

		return database.loadouts
			.edit(loadout.id, { ...updatedLoadout })
			.then(() => this.onLoadoutUpdated(updatedLoadout))
			.then(() => this.setDialog(null))
	}
	
	onLoadoutUpdated(updatedLoadout) {
		this.setState((prevState) => {
			let newLoadout = {
				...prevState.loadout,
				...updatedLoadout
			}

			return { loadout: newLoadout }
		})
	}

	render() {
		let { loading, error, loadout, activeDialog, speedDialOpen } = this.state

		if (loading) {			
			return <LoadingOverlay />
		}
		
		if (error) {
			if (error.status === 404) {
				return <ErrorOverlay message='Loadout not found.' icon='fa fa-crosshairs' />
			}

			return <ErrorOverlay message='Could not load loadout.' onRetry={ () => this.loadLoadout() } />
		}

		return (
			<React.Fragment>
				<ReactiveTitle>{ loadout.name }</ReactiveTitle>

				<div className='separator-padding'>
					<LoadoutView loadout={ loadout } editable={ true } />
				</div>

				<SpeedDial 
					ariaLabel='Loadout Actions' 
					icon={ <i className='fa fa-pen' /> }
					onOpen={ () => this.setSpeedDial(true) }
					onClose={ () => this.setSpeedDial(false) }
					open={ speedDialOpen }
				>
					<SpeedDialAction 
						icon={ <i className='fa fa-pen' /> }
						onClick={  () => this.setDialog('edit') }
						tooltipTitle='Edit'
						tooltipOpen={ true }
					/>

					<SpeedDialAction 
						icon={ <i className='fa fa-link' /> }
						onClick={ () => this.setDialog('share') }
						tooltipTitle='Share'
						tooltipOpen={ true }
					/>
				</SpeedDial>

				<EditLoadoutDialog
					name={ loadout.name }
					isOpen={ activeDialog === 'edit' }
					onSave={ (name) => this.editLoadout(name) }
					onClose={ () => this.setDialog(null) }
				/>

				<SetShareableDialog
					loadout={ loadout }
					isOpen={ activeDialog === 'share' }
					onShare={ (isShared) => this.onLoadoutUpdated({...loadout, shared: isShared }) }
					onClose={ () => this.setDialog(null) }
				/>
			</React.Fragment>
		)
	}
}


export default LoadoutPage
