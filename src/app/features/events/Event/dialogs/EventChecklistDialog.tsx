import React, { FC, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import useAnalytics from 'app/shared/hooks/useAnalytics'
import { Loadout, LoadoutPropType, LoadoutWeapon } from 'app/shared/models/loadout'
import { Attachment, Gear } from 'app/shared/models/armory-item'
import { Resource } from 'app/shared/models/resource'

// TODO: Styled components
const checkboxListStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
}

type EventChecklistDialogProps = {
	title: string
	loadout: Loadout
	isOpen: boolean
	onClose: () => any
}

const EventChecklistDialog: FC<EventChecklistDialogProps> = ({
	title,
	loadout,
	isOpen,
	onClose,
}) => {
	let analytics = useAnalytics()
	useEffect(() => {
		analytics.logEvent('view_event_checklist')
	}, [analytics])

	function getAllWeapons(loadout: Loadout): LoadoutWeapon[] {
		return loadout.weapons || []
	}

	function getAllAttachments(loadout: Loadout): Attachment[] {
		return loadout.weapons.flatMap((l) => l.attachments)
	}

	function getAllGear(loadout: Loadout): Gear[] {
		return loadout.gear || []
	}

	// eslint-disable-next-line react/no-multi-comp
	function toCheckbox(item: Resource, index: number) {
		return <FormControlLabel key={ index } label={ item.getTitle() } control={ <Checkbox /> } />
	}

	return (
		<Dialog open={ isOpen }>
			<DialogTitle>Checklist for {title} </DialogTitle>

			<DialogContent>
				<div style={ { display: 'flex', justifyContent: 'space-between' } }>
					<div style={ { ...checkboxListStyle, paddingRight: '16px' } }>
						<ReactiveTitle variant='h5' mobileVariant='h6'>
							Weapons
						</ReactiveTitle>
						{getAllWeapons(loadout)
							.map(toCheckbox)}
					</div>

					<div style={ { ...checkboxListStyle, paddingLeft: '16px' } }>
						<ReactiveTitle variant='h5' mobileVariant='h6'>
							Attachments
						</ReactiveTitle>
						{getAllAttachments(loadout)
							.map(toCheckbox)}
					</div>
				</div>

				<div>
					<ReactiveTitle variant='h5' mobileVariant='h6'>
						Gear
					</ReactiveTitle>
					{getAllGear(loadout)
						.map(toCheckbox)}
				</div>
			</DialogContent>

			<DialogActions>
				<Button onClick={ onClose } color='primary' variant='contained'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

EventChecklistDialog.propTypes = {
	title: PropTypes.string.isRequired,
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default EventChecklistDialog
