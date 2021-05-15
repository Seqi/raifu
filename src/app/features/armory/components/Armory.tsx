/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Box, styled, Theme, useMediaQuery } from '@material-ui/core'

import {
	armory as armoryService,
	weapons,
	attachments,
	gear,
	clothing,
} from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import useAnalytics from 'app/shared/hooks/useAnalytics'

import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'
import { ResourceList, ResourceListProps } from 'app/features/resource'

import {
	WeaponCard,
	AttachmentCard,
	GearCard,
	ClothingCard,
	RatioedArmoryCardContainer as ArmoryCardContainer,
	ArmoryCardContainerSize,
} from './cards'

import AddArmoryItemDialog from './AddArmoryItemDialog'
import { ArmoryCollection, ArmoryItem } from '../models/armory-item'

const armorySections: (Partial<ResourceListProps<ArmoryItem>> & {
	size: ArmoryCardContainerSize
})[] = [
	{
		resource: weapons,
		resourceName: 'weapons',
		ItemTemplate: WeaponCard,
		size: 'large',
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
		ItemTemplate: AttachmentCard,
		size: 'small',
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
		ItemTemplate: GearCard,
		size: 'small',
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
		ItemTemplate: ClothingCard,
		size: 'small',
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

type ArmoryState = {
	// eslint-disable-next-line no-unused-vars
	armory: { [key: string]: ArmoryItem[] }
	loading: boolean
	error: boolean
}

const defaultState: ArmoryState = {
	armory: {
		weapons: [],
		attachments: [],
		clothing: [],
		gear: [],
	},
	loading: true,
	error: false,
}

const ResourceListContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	'&:not(:first-child)': {
		marginTop: theme.spacing(12),

		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(6),
		},
	},
}))

export default function Armory() {
	let mounted = useRef(true)
	useEffect(() => {
		mounted.current = true

		return () => {
			mounted.current = false
		}
	}, [])

	let [{ armory, loading, error }, setArmory] = useState<ArmoryState>(defaultState)

	let loadArmory = useCallback(() => {
		setArmory(defaultState)

		armoryService
			.get()
			.then(
				(result: ArmoryCollection) =>
					mounted.current && setArmory({ armory: result, loading: false, error: false })
			)
			.catch(
				(e: any) =>
					mounted.current &&
					setArmory({ error: true, loading: false, armory: defaultState.armory })
			)
	}, [])

	useEffect(() => {
		loadArmory()
	}, [loadArmory])

	let analytics = useAnalytics()
	useEffect(() => {
		analytics.logEvent('view_armory_list')
	}, [analytics])

	const lg = useMediaQuery((theme: Theme) => theme.breakpoints.only('lg'))
	const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
	// Arbitrary number but it seems to work
	const xxs = useMediaQuery((theme: Theme) => theme.breakpoints.down(421))

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <ErrorOverlay message='Could not load armory.' onRetry={ loadArmory } />
	}

	return (
		<>
			{armorySections.map((armorySection) => (
				<ResourceListContainer component='section' key={ armorySection.resourceName }>
					<SidewaysTitle
						title={ armorySection.resourceName! }
						lowercase={ true }
						marginRight={ { xs: 1, sm: 2 } }
					/>

					<ResourceList
						items={ armory[armorySection.resourceName!] }
						resource={ armorySection.resource }
						resourceName={ armorySection.resourceName! }
						ItemTemplate={ armorySection.ItemTemplate! }
						AddButtonTemplate={ (props) => (
							<ArmoryCardContainer size={ armorySection.size } { ...props } />
						) }
						renderAddDialog={ armorySection.renderAddDialog! }
						onResourceClick={ () => {} } //No-op
						gridContainerProps={ {
							spacing: xs ? 1 : 2,
						} }
						gridItemProps={ {
							xl: 'auto',
							lg: 'auto',
							md: 3,
							sm: 4,
							xs: 4,
							// We want some unconventional sizing that Grid doesnt seem
							// to support. For lg, we want 5 items per row. Just seems
							// to work best. We also want to resize for some non-standard
							// breakpoints.
							style: lg
								? { width: '20%' }
								: xxs
									? { maxWidth: '50%', flexBasis: '50%' }
									: undefined,
						} }
					/>
				</ResourceListContainer>
			))}
		</>
	)
}
