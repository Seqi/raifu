/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useEffect } from 'react'

import { Box, GridProps, styled, Theme, useMediaQuery } from '@material-ui/core'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { useQuery } from '@tanstack/react-query'

import { weapons, attachments, gear, clothing } from 'app/data/api'
import { ErrorOverlay, LoadingOverlay } from 'app/shared/state'
import useAnalytics from 'app/shared/hooks/useAnalytics'
import { Resource, ResourcePropShape } from 'app/features/resource'

import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'
import { ResourceList, ResourceListProps } from 'app/features/resource'

import {
	WeaponCard,
	AttachmentCard,
	GearCard,
	ClothingCard,
	RatioedArmoryCardContainer as ArmoryCardContainer,
} from './cards'

import AddArmoryItemDialog from './AddArmoryItemDialog'
import { ArmoryCollection, ArmoryItem } from '../models/armory-item'

const armorySections: (Partial<ResourceListProps<ArmoryItem>> & {
	key: keyof ArmoryCollection
	size: 'large' | 'small'
	getItemStyle?: (breakpoint: Breakpoint | 'xxs') => React.CSSProperties
})[] = [
	{
		key: 'weapons',
		ItemTemplate: WeaponCard,
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{...props}
				resourceTitle='weapon'
				resourceKey='weapons'
				resourceName='Weapon'
			/>
		),
		size: 'large',
	},
	{
		key: 'attachments',
		ItemTemplate: AttachmentCard,
		size: 'small',
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{...props}
				resourceTitle='attachment'
				resourceKey='attachments'
				resourceName='Attachment'
			/>
		),
	},
	{
		key: 'gear',
		ItemTemplate: GearCard,
		size: 'small',
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{...props}
				resourceTitle='gear'
				resourceKey='gear'
				resourceName='Gear'
			/>
		),
	},
	{
		key: 'clothing',
		ItemTemplate: ClothingCard,
		size: 'small',
		renderAddDialog: (props) => (
			<AddArmoryItemDialog
				{...props}
				resourceTitle='clothing'
				resourceKey='clothing'
				resourceName='Clothing'
			/>
		),
	},
]

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
	const {
		data: armory,
		isFetching,
		error,
		refetch,
	} = useQuery<ArmoryCollection>(['armory'])

	let analytics = useAnalytics()
	useEffect(() => {
		analytics.logEvent('view_armory_list')
	}, [analytics])

	const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))
	const lg = useMediaQuery((theme: Theme) => theme.breakpoints.only('lg'))
	const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
	const xxs = useMediaQuery((theme: Theme) => theme.breakpoints.down(461))
	const xxxs = useMediaQuery((theme: Theme) => theme.breakpoints.down(391))

	if (error) {
		return <ErrorOverlay message='Could not load armory.' onRetry={() => refetch()} />
	}

	if (isFetching || !armory) {
		return <LoadingOverlay />
	}

	const largeGridItemProps = (
		xl: boolean,
		lg: boolean,
		xxs: boolean,
		xxxs: boolean
	): GridProps => ({
		lg: 'auto',
		md: 3,
		xs: 4,
		style: largeGridItemStyle(xl, lg, xxs, xxxs),
	})

	const largeGridItemStyle = (
		xl: boolean,
		lg: boolean,
		xxs: boolean,
		xxxs: boolean
	): React.CSSProperties => {
		// We want some unconventional sizing that Grid doesnt seem
		// to support. For lg, we want 5 items per row. Just seems
		// to work best. We also want to resize for some non-standard
		// breakpoints.
		if (xl) {
			return { width: '253px' }
		} else if (lg) {
			return { width: '20%' }
		} else if (xxxs) {
			return { maxWidth: '50%', flexBasis: '50%' }
		} else {
			return {}
		}
	}

	const smallGridItemProps = (
		xl: boolean,
		lg: boolean,
		xxs: boolean,
		xxxs: boolean
	): GridProps => ({
		xl: 'auto',
		lg: 2,
		md: 3,
		xs: 4,
		style: smallGridItemStyle(xl, lg, xxs, xxxs),
	})

	const smallGridItemStyle = (
		xl: boolean,
		lg: boolean,
		xxs: boolean,
		xxxs: boolean
	): React.CSSProperties => {
		if (xl) {
			return { width: '209px' }
		} else if (xxxs) {
			return { maxWidth: '50%', flexBasis: '50%' }
		} else {
			return {}
		}
	}

	return (
		<>
			{armorySections.map((armorySection) => (
				<ResourceListContainer
					component='section'
					key={armorySection.key}
					aria-labelledby={`${armorySection.key}-list`}
				>
					<SidewaysTitle
						title={armorySection.key}
						textProps={{ id: `${armorySection.key}-list` }}
						marginRight={{ xs: 1, sm: 2 }}
					/>

					<ResourceList
						items={armory[armorySection.key]}
						AddButtonTemplate={(props) => <ArmoryCardContainer {...props} />}
						ItemTemplate={armorySection.ItemTemplate!}
						renderAddDialog={armorySection.renderAddDialog!}
						onResourceClick={(item) => {}}
						addResource={() => {
							return {} as any
						}}
						deleteResource={() => {
							return {} as any
						}}
					/>
				</ResourceListContainer>
			))}
		</>
	)
}
