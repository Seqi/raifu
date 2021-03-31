import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'

import useIsPageAtBottom from 'app/shared/hooks/useIsPageAtBottom'
import { EditLoadoutDialog, SetShareableDialog } from '../dialogs'
import { Loadout, LoadoutPropType } from '../../models'

type LoadoutActionsProps = {
	loadout: Loadout
	editLoadout: (loadout: Loadout) => Promise<any>
	onSharedChanged: (shared: boolean) => any
}

const LoadoutActions: FC<LoadoutActionsProps> = ({
	loadout,
	editLoadout,
	onSharedChanged,
}) => {
	let [dialog, setDialog] = useState<'edit' | 'share' | null>(null)
	let [speedDialOpen, setSpeedDialOpen] = useState<boolean>(false)

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
					onClick={ () => setDialog('edit') }
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
				loadout={ loadout }
				action='Edit'
				isOpen={ dialog === 'edit' }
				onSave={ (name) => editLoadout(name)
					.then(() => setDialog(null)) }
				onClose={ () => setDialog(null) }
			/>

			<SetShareableDialog
				loadout={ loadout }
				isOpen={ dialog === 'share' }
				onShare={ onSharedChanged }
				onClose={ () => setDialog(null) }
			/>
		</React.Fragment>
	)
}

export default LoadoutActions

LoadoutActions.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
	editLoadout: PropTypes.func.isRequired,
	onSharedChanged: PropTypes.func.isRequired,
}
