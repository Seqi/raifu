import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import ResourceImage from 'app/shared/images/ResourceImage'
import Deletable from 'app/shared/actions/Deletable'

import { LoadoutContext } from 'app/features/loadouts'

import './LoadoutWeaponItem.css'

let LoadoutWeaponItem = ({ weapon }) => {
	let { editable, deleteWeapon } = useContext(LoadoutContext)

	let deleteNewWeapon = useCallback(() => deleteWeapon(weapon.id), [deleteWeapon, weapon])

	return (
		<div className='loadout-weapon-item' >
			<ReactiveTitle variant='h4' mobileVariant='h5' style={ { zIndex: 1 } }>
				<Deletable 
					dialogTitle={ weapon.getTitle() } 
					canDelete={ editable } 
					onDelete={ deleteNewWeapon }
					style={ { position: 'initial'} }
				>
					{ weapon.getTitle() }
				</Deletable>
			</ReactiveTitle>				

			<div className='center-loadout-item'>
				<ResourceImage 
					style={ { width: '100%', height: '100%'	} }
					resource={ weapon }
					resourceType='weapons'
				/>
			</div>
		</div>
	)
}

LoadoutWeaponItem.propTypes = {
	weapon: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired
}

export default LoadoutWeaponItem