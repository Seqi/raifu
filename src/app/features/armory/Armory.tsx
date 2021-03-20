/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Box, Typography, styled } from '@material-ui/core'

import {
	armory as armoryService,
	weapons,
	attachments,
	gear,
	clothing,
} from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import useAnalytics from 'app/shared/hooks/useAnalytics'
import {
	ResourceListContainer as ResourceList,
	ResourceListContainerProps,
} from 'app/shared/resources'
import { WeaponCard, AttachmentCard, GearCard, ClothingCard } from 'app/shared/cards'

import AddArmoryItemDialog from './AddArmoryItemDialog'
import { Armory as ArmoryCollection } from 'app/shared/models/armory-item'

const defaultState = { armory: null, loading: true, error: false }

const armorySections: Partial<ResourceListContainerProps>[] = [
	{
		resource: weapons,
		resourceName: 'weapons',
		card: WeaponCard,
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{ ...props }
				resourceTitle='weapon'
				resourceKey='weapons'
				resourceName='Weapon'
			/>
		),
	},
	{
		resource: attachments,
		resourceName: 'attachments',
		card: AttachmentCard,
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{ ...props }
				resourceTitle='attachment'
				resourceKey='attachments'
				resourceName='Attachment'
			/>
		),
	},
	{
		resource: gear,
		resourceName: 'gear',
		card: GearCard,
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{ ...props }
				resourceTitle='gear'
				resourceKey='gear'
				resourceName='Gear'
			/>
		),
	},
	{
		resource: clothing,
		resourceName: 'clothing',
		card: ClothingCard,
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{ ...props }
				resourceTitle='clothing'
				resourceKey='clothing'
				resourceName='Clothing'
			/>
		),
	},
]

let ResourceListContainer = styled(Box)(({ theme }) => ({
	'&:not(:first-child)': {
		marginTop: theme.spacing(3),
	},
}))

let ResourceTitle = styled(Typography)(({ theme }) => ({
	textTransform: 'capitalize',

	[theme.breakpoints.down('sm')]: {
		fontSize: '2rem',
	},
}))

type ArmoryState = { armory: any; loading: boolean; error: boolean }

export default function Armory() {
	let [{ armory, loading, error }, setArmory] = useState<ArmoryState>(defaultState)

	let mounted = useRef(true)
	useEffect(() => {
		return () => {
			mounted.current = false
		}
	}, [])

	let loadArmory = useCallback(() => {
		setArmory(defaultState)

		armoryService
			.get()
			.then(
				(result: ArmoryCollection) =>
					mounted && setArmory({ armory: result, loading: false, error: false })
			)
			.catch(
				(e: any) => mounted && setArmory({ error: true, loading: false, armory: null })
			)
	}, [])

	useEffect(() => {
		loadArmory()
	}, [loadArmory])

	let analytics = useAnalytics()
	useEffect(() => {
		analytics.logEvent('view_armory_list')
	}, [analytics])

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <ErrorOverlay message='Could not load armory.' onRetry={ loadArmory } />
	}

	return (
		<React.Fragment>
			{armorySections.map((armorySection) => (
				<ResourceListContainer component='section' key={ armorySection.resourceName }>
					<ResourceTitle variant='h3'>{armorySection.resourceName}</ResourceTitle>

					<ResourceList
						items={ armory[armorySection.resourceName!] }
						resource={ armorySection.resource }
						resourceName={ armorySection.resourceName! }
						card={ armorySection.card! }
						renderAddDialog={ armorySection.renderAddDialog! }
						onResourceClick={ () => {} } //No-op
					/>
				</ResourceListContainer>
			))}
		</React.Fragment>
	)
}
