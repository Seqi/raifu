import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutContext from './LoadoutContext'

import './Loadout.css'
import LoadoutSeparator from './LoadoutSeparator'

class LoadoutView extends React.Component {
	render() {
		let { 
			loadout,
			canEdit, 
			onWeaponAdd, 
			onWeaponDelete, 
			onAttachmentsAdd, 
			onAttachmentDelete, 
			onGearAdd, 
			onGearDelete 
		} = this.props 
		
		return (
			<LoadoutContext.Provider value={ loadout }>
				<div>
					<LoadoutWeaponList
						loadoutId={ loadout.id }
						weapons={ loadout.weapons }
						canEdit={ canEdit }
						onAdd={ onWeaponAdd } 
						onDelete={ onWeaponDelete } 
						onAttachmentsAdd={ onAttachmentsAdd }
						onAttachmentDelete={ onAttachmentDelete }
					/>
				</div>

				<LoadoutSeparator>
					<Typography variant='h4'>Gear</Typography>
					<LoadoutGearList 
						loadoutId={ loadout.id } 
						gear={ loadout.gear }
						canEdit={ canEdit }
						onAdd={ onGearAdd } 
						onDelete={ onGearDelete } 
					/>
				</LoadoutSeparator>
			</LoadoutContext.Provider>
		)
	}
}

LoadoutView.propTypes = {	
	loadout: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
		gear: PropTypes.array.isRequired,
		weapons: PropTypes.arrayOf(PropTypes.shape({			
			platform: PropTypes.string.isRequired,
			model: PropTypes.string,
			brand: PropTypes.string,
			nickname: PropTypes.string,
			type: PropTypes.string.isRequired,
			getTitle: PropTypes.func.isRequired,
			getSubtitle: PropTypes.func.isRequired,
			attachments: PropTypes.arrayOf(PropTypes.shape({			
				platform: PropTypes.string.isRequired,
				model: PropTypes.string,
				brand: PropTypes.string,
				nickname: PropTypes.string,
				type: PropTypes.string.isRequired,
				getTitle: PropTypes.func.isRequired,
				getSubtitle: PropTypes.func.isRequired,
			}))
		}))
	}).isRequired,
	canEdit: PropTypes.bool,
	onWeaponAdd: PropTypes.func,
	onWeaponDelete: PropTypes.func,
	onAttachmentsAdd: PropTypes.func,
	onAttachmentDelete: PropTypes.func,
	onGearAdd: PropTypes.func,
	onGearDelete: PropTypes.func
}

LoadoutView.defaultProps = {
	canEdit: false,
	onWeaponAdd: (weapon) => {},
	onWeaponDelete: (weaponId) => {},
	onAttachmentsAdd: (weaponId, attachments) => {},
	onAttachmentDelete: (weaponId, attachmentId) => {},
	onGearAdd: (weapon) => {},
	onGearDelete: (weaponId) => {},
}

export default LoadoutView
