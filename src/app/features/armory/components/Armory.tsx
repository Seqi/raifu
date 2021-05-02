/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Box, Slide, styled, Typography } from '@material-ui/core'

import {
	armory as armoryService,
	weapons,
	attachments,
	gear,
	clothing,
} from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import useAnalytics from 'app/shared/hooks/useAnalytics'

import { ResourceList, ResourceListProps } from 'app/features/resource'

import {
	WeaponCard,
	AttachmentCard,
	GearCard,
	ClothingCard,
	ArmoryCardContainer,
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
		card: WeaponCard,
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
		card: AttachmentCard,
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
		card: GearCard,
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
		card: ClothingCard,
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
	marginTop: theme.spacing(4),
	'&:not(:first-child)': {
		marginTop: theme.spacing(12),
	},
}))

const ResourceListTitle = styled(Box)(({ theme }) => ({
	writingMode: 'vertical-rl',
	borderRight: `3px solid ${theme.palette.primary.main}`,
	marginRight: theme.spacing(2),
}))

const ResourceListTitleText = styled(Typography)({
	transform: 'rotate(180deg)',
	textAlign: 'right',
	lineHeight: 1.5,
})

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
				(e: any) =>
					mounted &&
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
					<ResourceListTitle>
						<Slide in={ true } direction='right'>
							<Box width='50px'>
								<ResourceListTitleText variant='h3'>
									{armorySection.resourceName}
								</ResourceListTitleText>
							</Box>
						</Slide>
					</ResourceListTitle>

					<ResourceList
						items={ armory[armorySection.resourceName!] }
						resource={ armorySection.resource }
						resourceName={ armorySection.resourceName! }
						card={ armorySection.card! }
						cardContainer={ (props) => (
							<ArmoryCardContainer size={ armorySection.size } { ...props } />
						) }
						renderAddDialog={ armorySection.renderAddDialog! }
						onResourceClick={ () => {} } //No-op
					/>
				</ResourceListContainer>
			))}
		</React.Fragment>
	)
}
