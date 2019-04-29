import React from 'react'
import PropTypes from 'prop-types'

import AddCard from 'app/shared/components/Cards/AddCard'
import LoadoutGear from './Gear/LoadoutGear'

import AddGearDialog from './AddGearDialog'

import database from '../../../../../firebase/database'


export default class LoadoutGearList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isDialogOpen: false
		}
	}

	openDialog() {
		this.setState({ isDialogOpen: true })
	}

	closeDialog() {
		this.setState({ isDialogOpen: false })
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
			<LoadoutGear 
				key={ gear.id } 
				gear={ gear } 
				onDelete={ (gearId) => this.deleteGear(gearId) }
			/>
		))
	}

	render() {
		let { gear } = this.props

		return (
			<React.Fragment>
				{ this.renderGearList(gear) }
				<AddCard onClick={ () => this.openDialog() } />

				<AddGearDialog 
					filterIds={ gear.map(g => g.id) }
					isOpen={ this.state.isDialogOpen } 
					onSave={ gearId => this.addGear(gearId) }
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