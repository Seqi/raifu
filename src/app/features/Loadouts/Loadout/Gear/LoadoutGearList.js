import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import AddCard from 'app/shared/components/Cards/AddCard'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import WeaponCardContent from 'app/shared/components/Images/WeaponCardContent'

import AddGearDialog from './AddGearDialog'

import database from '../../../../../firebase/database'


export default class LoadoutGearList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			activeDialog: null
		}
	}

	openDialog(name) {
		this.setState({activeDialog: name})
	}

	openDeleteDialog(gear) {
		this.activeItem = gear
		this.openDialog('delete')
	}

	closeDialog() {
		this.activeItem = null
		this.setState({activeDialog: null})
	}

	buildTitle(gear) {
		return gear.nickname || `${gear.platform} ${gear.model}`
	}

	buildSubtitle (gear) {
		return  gear.brand || ''
	}

	addGear(gearId) {
		let { loadoutId, onAdd } = this.props 

		database.loadouts
			.loadout(loadoutId)
			.gear
			.add(gearId)
			.then((gear) => onAdd(gear))
			.then(() => this.closeDialog())
	}	
	
	deleteGear(gearId) {
		let { loadoutId, onDelete } = this.props 

		database.loadouts
			.loadout(loadoutId)
			.gear
			.delete(gearId)
			.then(() => onDelete(gearId))
			.then(() => this.closeDialog())
	}

	renderGearList(gearList) {
		if (!gearList || !gearList.length) {
			return null
		}
		
		return gearList.map(gear => (
			<Card key={ gear.id } className={ 'card weapon-card' }>
				<CardDeleteButton onClick={ () => this.openDeleteDialog(gear) } />
				<CardHeader className='card-header' title={ this.buildTitle(gear) } subheader={ this.buildSubtitle(gear) } />
				<CardContent className='card-content'> <WeaponCardContent weapon={ gear } /> </CardContent>
			</Card>
		))
	}

	render() {
		let { activeDialog } = this.state 

		return (
			<React.Fragment>
				{ this.renderGearList(this.props.gear) }
				<AddCard onClick={ () => this.openDialog('add') } />

				<AddGearDialog 
					filterIds={ this.props.gear.map(g => g.id) }
					isOpen={ activeDialog === 'add' } 
					onSave={ gearId => this.addGear(gearId) }
					onClose={ () => this.closeDialog() } 
				/> 
					
				<ConfirmDeleteDialog 
					isOpen={ activeDialog === 'delete' }
					title={ this.activeItem ? this.buildTitle(this.activeItem) : '' }
					onConfirm={ () => this.deleteGear(this.activeItem.id) }
					onClose={ () => this.closeDialog() }
				/>
					
			</React.Fragment>
		)
	}
}

LoadoutGearList.propTypes = {
	loadoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	gear: PropTypes.array,
	onAdd: PropTypes.func,
	onDelete: PropTypes.func
}

LoadoutGearList.defaultProps = {
	gear: [],
	onAdd: gear => {},
	onDelete: gearId => {}
}