import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Box, Typography, styled } from '@material-ui/core'

import { ErrorOverlay, LoadingOverlay } from 'app/shared'
import { ResourceList } from 'app/shared/resources'
import { AddWeaponDialog, AddAttachmentDialog, AddGearDialog, AddClothingDialog } from './dialogs'

import { armory as armoryService, weapons, attachments, gear, clothing } from 'app/data/api'

const defaultState = {armory: null, loading: true, error: false}

const armorySections = [
	{
		resource: weapons,
		resourceType: 'weapons',
		renderDialog: AddWeaponDialog,
	},
	{
		resource: attachments,
		resourceType: 'attachments',
		renderDialog: AddAttachmentDialog
	},
	{
		resource: gear,
		resourceType: 'gear',
		renderDialog: AddGearDialog
	},
	{
		resource: clothing,
		resourceType: 'clothing',
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

let Armory = () => {
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
		<ResourceListContainer component='section' key={ armorySection.resourceType }>
			<ResourceTitle variant='h3'>
				{ armorySection.resourceType }
			</ResourceTitle>
					
			<ResourceList
				items={ armory[armorySection.resourceType] }
				resource={ armorySection.resource }
				resourceType={ armorySection.resourceType }
				addDialog={ armorySection.renderDialog } 
			/>
		</ResourceListContainer>
	))
}

export default Armory
