/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Box, Typography, styled } from '@material-ui/core'

import { armory as armoryService, weapons, attachments, gear, clothing } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import useAnalytics from 'app/shared/hooks/useAnalytics'
import { ResourceList } from 'app/shared/resources'
import { WeaponCard, AttachmentCard, GearCard, ClothingCard } from 'app/shared/cards'

import AddArmoryItemDialog from './AddArmoryItemDialog'

const defaultState = { armory: null, loading: true, error: false }

const armorySections = [
	{
		resource: weapons,
		resourceKey: 'weapons',
		card: WeaponCard,
		renderDialog: (props) => (
			<AddArmoryItemDialog {...props} resourceTitle='weapon' resourceKey='weapons' resourceName='Weapon' />
		),
	},
	{
		resource: attachments,
		resourceKey: 'attachments',
		card: AttachmentCard,
		renderDialog: (props) => (
			<AddArmoryItemDialog
				{...props}
				resourceTitle='attachment'
				resourceKey='attachments'
				resourceName='Attachment'
			/>
		),
	},
	{
		resource: gear,
		resourceKey: 'gear',
		card: GearCard,
		renderDialog: (props) => (
			<AddArmoryItemDialog {...props} resourceTitle='gear' resourceKey='gear' resourceName='Gear' />
		),
	},
	{
		resource: clothing,
		resourceKey: 'clothing',
		card: ClothingCard,
		renderDialog: (props) => (
			<AddArmoryItemDialog {...props} resourceTitle='clothing' resourceKey='clothing' resourceName='Clothing' />
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

export default function Armory() {
	let [{ armory, loading, error }, setArmory] = useState(defaultState)

	let mounted = useRef(true)
	useEffect(() => () => (mounted.current = false), [])

	let loadArmory = useCallback(() => {
		setArmory(defaultState)

		armoryService
			.get()
			.then((result) => mounted && setArmory({ armory: result, loading: false }))
			.catch((e) => mounted && setArmory({ error: true, loading: false }))
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
		return <ErrorOverlay message='Could not load armory.' onRetry={loadArmory} />
	}

	return armorySections.map((armorySection) => (
		<ResourceListContainer component='section' key={armorySection.resourceKey}>
			<ResourceTitle variant='h3'>{armorySection.resourceKey}</ResourceTitle>

			<ResourceList
				items={armory[armorySection.resourceKey]}
				resource={armorySection.resource}
				resourceName={armorySection.resourceKey}
				card={armorySection.card}
				renderAddDialog={armorySection.renderDialog}
			/>
		</ResourceListContainer>
	))
}
