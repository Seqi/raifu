import React from 'react'
import PropTypes from 'prop-types'

import AddButton from 'app/shared/components/Buttons/AddButton'

import LoadoutGear from './Gear/LoadoutGear'
import AddArmoryItemDialog from '../AddArmoryItemDialog/AddArmoryItemDialog'

import database from '../../../../../../firebase/database'

import './LoadoutGearList.css'

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

		return database.loadouts
			.loadout(loadoutId)
			.gear
			.add(gearId)
			.then((gear) => onAdd(gear))
			.then(() => this.closeDialog())
	}	
	
	deleteGear(gearId) {
		let { loadoutId, onDelete } = this.props 

		return database.loadouts
			.loadout(loadoutId)
			.gear
			.delete(gearId)
			.then(() => onDelete(gearId))
	}

	renderGearList(gearList) {
		if (!gearList || !gearList.length) {
			return null
		}
		
		return gearList.map(gear => (
			<div key={ gear.id } className='loadout-gear-list-item'>
				<LoadoutGear 
					gear={ gear } 
					canDelete={ this.props.canEdit }
					onDelete={ (gearId) => this.deleteGear(gearId) }
				/>
			</div>
		))
	}

	render() {
		let { gear, canEdit } = this.props

		return (
			<React.Fragment>
				<div className='loadout-gear-list-container'>
					{ this.renderGearList(gear) }

					{ canEdit && 
						<div className='loadout-gear-list-item'>
							<AddButton onClick={ () => this.openDialog() } />
						</div>
					}
				</div>

				{ canEdit && <AddArmoryItemDialog 
					title='Add gear to loadout'
					category='gear'
					itemLoadFunc={ database.gear.get }
					filterIds={ gear.map(g => g.id) }
					isOpen={ this.state.isDialogOpen } 
					onSave={ gearId => this.addGear(gearId) }
					onClose={ () => this.closeDialog() } 
				/> }
					
			</React.Fragment>
		)
	}
}

LoadoutGearList.propTypes = {
	loadoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	gear: PropTypes.array,
	canEdit: PropTypes.bool,
	onAdd: PropTypes.func,
	onDelete: PropTypes.func
}

LoadoutGearList.defaultProps = {
	gear: [],
	canEdit: false,
	onAdd: gear => {},
	onDelete: gearId => {}
}