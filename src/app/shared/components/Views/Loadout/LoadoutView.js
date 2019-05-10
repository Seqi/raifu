import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import LoadoutGearList from './GearList/LoadoutGearList'
import LoadoutWeaponList from './WeaponList/LoadoutWeaponList'
import LoadoutContext from './LoadoutContext'

import './Loadout.css'

class LoadoutView extends React.Component {
	render() {
		let { loadout, onWeaponAdd, onWeaponDelete, onAttachmentsAdd, onAttachmentDelete, onGearAdd, onGearDelete } = this.props 
		return (
			<LoadoutContext.Provider value={ loadout }>
				<div className='loadout-slot-list'>
					<LoadoutWeaponList
						loadoutId={ loadout.id }
						weapons={ loadout.weapons }
						onAdd={ onWeaponAdd } 
						onDelete={ onWeaponDelete } 
						onAttachmentsAdd={ onAttachmentsAdd }
						onAttachmentDelete={ onAttachmentDelete }
					/>
				</div>

				<Typography variant='h4'>Gear</Typography>

				<div className='loadout-slot-list'>
					<LoadoutGearList 
						loadoutId={ loadout.id } 
						gear={ loadout.gear }
						onAdd={ onGearAdd } 
						onDelete={ onGearDelete } 
					/>
				</div>
			</LoadoutContext.Provider>
		)
	}
}

LoadoutView.propTypes = {	
	loadout: PropTypes.shape({
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
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
	onWeaponAdd: PropTypes.func,
	onWeaponDelete: PropTypes.func,
	onAttachmentsAdd: PropTypes.func,
	onAttachmentDelete: PropTypes.func,
	onGearAdd: PropTypes.func,
	onGearDelete: PropTypes.func
}

LoadoutView.defaultProps = {
	onWeaponAdd: (weapon) => {},
	onWeaponDelete: (weaponId) => {},
	onAttachmentsAdd: (weaponId, attachments) => {},
	onAttachmentDelete: (weaponId, attachmentId) => {},
	onGearAdd: (weapon) => {},
	onGearDelete: (weaponId) => {},
}

export default withRouter(LoadoutView)
