import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Box, Typography, styled } from '@material-ui/core'

import { armory as armoryService, weapons, attachments, gear, clothing } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import { ResourceList } from 'app/shared/resources'
import { WeaponCard, AttachmentCard, GearCard, ClothingCard } from 'app/shared/cards'

import { AddWeaponDialog, AddAttachmentDialog, AddGearDialog, AddClothingDialog } from './dialogs'

const defaultState = {armory: null, loading: true, error: false}

const armorySections = [
	{
		resource: weapons,
		resourceKey: 'weapons',
		card: WeaponCard,
		renderDialog: AddWeaponDialog,
	},
	{
		resource: attachments,
		resourceKey: 'attachments',
		card: AttachmentCard,
		renderDialog: AddAttachmentDialog
	},
	{
		resource: gear,
		resourceKey: 'gear',
		card: GearCard,
		renderDialog: AddGearDialog
	},
	{
		resource: clothing,
		resourceKey: 'clothing',
		card: ClothingCard,
		renderDialog: AddClothingDialog
	},
]

let ResourceListContainer = styled(Box)(({ theme }) => ({
	'&:not(:first-child)': {
		marginTop: theme.spacing(3)
	}
}))

let ResourceTitle = styled(Typography)(({ theme }) => ({
	textTransform: 'capitalize',

	[theme.breakpoints.down('sm')]: {
		fontSize: '2rem'
	},
}))

export default function Armory() {
	let [{ armory, loading, error }, setArmory] = useState(defaultState)

	let mounted = useRef(true)
	useEffect(() => () => mounted.current = false, [])

	let loadArmory = useCallback(() => {
		setArmory(defaultState)

		armoryService.get()
			.then(result => mounted && setArmory({ armory: result, loading: false }))			
			.catch(e => mounted && setArmory({ error: true, loading: false }))
	}, [])
	useEffect(() => { loadArmory() }, [loadArmory])

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <ErrorOverlay message='Could not load armory.' onRetry={ loadArmory } />
	}

	return armorySections.map(armorySection => (
		<ResourceListContainer component='section' key={ armorySection.resourceKey }>
			<ResourceTitle variant='h3'>
				{ armorySection.resourceKey }
			</ResourceTitle>
					
			<ResourceList
				items={ armory[armorySection.resourceKey] }
				resource={ armorySection.resource }
				card={ armorySection.card }
				addDialog={ armorySection.renderDialog } 
			/>
		</ResourceListContainer>
	))
}
