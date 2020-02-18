import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'

import useIsPageAtBottom from 'app/shared/hooks/useIsPageAtBottom'
import { EditLoadoutDialog, SetShareableDialog } from './dialogs'

function LoadoutActions( { loadout, editLoadout, onLoadoutUpdated }) {
	let [ dialog, setDialog] = useState()
	let [ speedDialOpen, setSpeedDialOpen ] = useState(false)

	let isAtBottom = useIsPageAtBottom()

	return (
		<React.Fragment>
			{/* Actions */}
			<SpeedDial 
				ariaLabel='Loadout Actions' 
				icon={ <i className='fa fa-pen' /> }
				onOpen={ () => setSpeedDialOpen(true) }
				onClose={ () => setSpeedDialOpen(false) }
				open={ speedDialOpen }
				hidden={ isAtBottom }
			>
				<SpeedDialAction 
					icon={ <i className='fa fa-pen' /> }
					onClick={  () => setDialog('edit') }
					tooltipTitle='Edit'
					tooltipOpen={ true }
				/>

				<SpeedDialAction 
					icon={ <i className='fa fa-link' /> }
					onClick={ () => setDialog('share') }
					tooltipTitle='Share'
					tooltipOpen={ true }
				/>
			</SpeedDial>

			{/* Dialogs */}
			<EditLoadoutDialog
				name={ loadout.name }
				isOpen={ dialog === 'edit' }
				onSave={ (name) => editLoadout(name) }
				onClose={ () => setDialog(null) }
			/>

			<SetShareableDialog
				loadout={ loadout }
				isOpen={ dialog === 'share' }
				onShare={ (isShared) => onLoadoutUpdated({...loadout, shared: isShared }) }
				onClose={ () => setDialog(null) }
			/>
		</React.Fragment>
	)
}

export default LoadoutActions

LoadoutActions.propTypes = {
	loadout: PropTypes.object.isRequired,
	editLoadout: PropTypes.func.isRequired,
	onLoadoutUpdated: PropTypes.func.isRequired
}