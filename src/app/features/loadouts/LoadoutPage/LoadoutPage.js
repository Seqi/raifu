import React from 'react'

import { Loading, Error } from 'app/shared/components'
import { LoadoutView } from 'app/features/loadouts'
import ReactiveTitle from 'app/shared/components/text/ReactiveTitle'

import { EditLoadoutDialog, SetShareableDialog } from './dialogs'
import database from '../../../../firebase/database'

class LoadoutPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: null,
			activeDialog: null,
			loading: true,
			error: null
		}
	}

	componentDidMount() {
		this.loadLoadout()
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}
	
	loadLoadout() {
		database.loadouts
			.getById(this.props.match.params.id)
			.then((loadout) => {
				if (!this.isUnmounted) {
					this.setState({ loadout, error: null, loading: false })
				}
			})
			.catch((err) => this.setState({ error: 'An error occurred while loading loadout.', loading: false }))
	}

	setDialog(id) {
		this.setState({ activeDialog: id })
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
		let { loading, error, loadout, activeDialog } = this.state

		if (loading) {			
			return <Loading />
		}
		
		if (error) {
			return <Error error={ error } onRetry={ () => this.loadLoadout() } />
		}

		return (
			<React.Fragment>
				<ReactiveTitle>
					{ loadout.name }					
					<i onClick={ () => this.setDialog('edit') } className='fa fa-pen icon-action' />
					<i onClick={ () => this.setDialog('share') } className='fa fa-link icon-action' />
				</ReactiveTitle>

				<div className='separator-padding'>
					<LoadoutView loadout={ loadout } editable={ true } />
				</div>

				<EditLoadoutDialog
					name={ loadout.name }
					isOpen={ activeDialog === 'edit' }
					onSave={ (name) => this.editLoadout(name) }
					onClose={ () => this.setDialog() }
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
