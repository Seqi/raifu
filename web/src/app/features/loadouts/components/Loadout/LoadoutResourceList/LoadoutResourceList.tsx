import React, { useState, useCallback, useContext, FC } from 'react'
import PropTypes from 'prop-types'

import { Grid, GridProps, styled } from '@material-ui/core'

import { Category } from 'app/data/constants/platforms'
import { ArmoryItem, ArmoryItemPropShape } from 'app/features/armory'
import AddButton from 'app/shared/actions/add/AddButton'

import { LoadoutContext } from '../LoadoutContext'
import LoadoutResourceItem from './LoadoutResourceItem'

const ResourceGridItem = styled(Grid)(({ theme }) => ({
	width: '300px',
	minHeight: '250px',
	padding: theme.spacing(4),

	'& .fa-plus': {
		fontSize: '3.5rem',
	},

	[theme.breakpoints.down('lg')]: {
		'& .item-text, & .fa-times': {
			fontSize: '0.9rem',
		},

		'& .fa-plus': {
			fontSize: '3rem',
		},

		padding: theme.spacing(3),
		width: 'initial',
	},

	[theme.breakpoints.down('md')]: {
		'& .fa-plus': {
			fontSize: '2.5rem',
		},

		minHeight: '200px',
		padding: theme.spacing(2),
	},

	[theme.breakpoints.down('sm')]: {
		'& .item-text, & .fa-times': {
			fontSize: '0.8rem',
		},
		'& .fa-plus': {
			fontSize: '2rem',
		},

		minHeight: '175px',
		padding: theme.spacing(1.5),
	},

	[theme.breakpoints.down('xs')]: {
		minHeight: '150px',
	},
}))

const ResourceGrid = styled(Grid)(({ theme }) => ({}))

type LoadoutResourceListProps<T extends ArmoryItem = ArmoryItem> = {
	resourceType: Category // TODO Remove weapon,
	items: T[]
	canAdd: boolean
	addItem: (itemIds: string[]) => any
	deleteItem: (item: T) => any
	renderAddDialog: (
		isOpen: boolean,
		onClose: () => any,
		addItemToLoadout: (itemIds: string | string[]) => Promise<any>
	) => React.ReactNode
	gridItemProps?: GridProps
}

const LoadoutResourceList: FC<LoadoutResourceListProps> = ({
	resourceType,
	items,
	canAdd,
	addItem,
	deleteItem,
	renderAddDialog,
	gridItemProps,
}) => {
	let [dialog, setDialog] = useState<'add' | null>(null)
	let { editable } = useContext(LoadoutContext)

	let addItemToLoadout = useCallback(
		async (itemIds) => {
			await addItem(itemIds)
			setDialog(null)
		},
		[addItem]
	)

	return (
		<>
			<ResourceGrid container={true}>
				{items.map((item) => (
					<ResourceGridItem item={true} key={item.id} xs={4} xl='auto' {...gridItemProps}>
						<LoadoutResourceItem
							resourceType={resourceType}
							item={item}
							canDelete={editable}
							onDelete={deleteItem}
						/>
					</ResourceGridItem>
				))}

				{editable && canAdd && (
					<ResourceGridItem item={true} xs={4} xl='auto' {...gridItemProps}>
						<AddButton onClick={() => setDialog('add')} />
					</ResourceGridItem>
				)}
			</ResourceGrid>

			{editable &&
				canAdd &&
				renderAddDialog(
					// Is Open
					dialog === 'add',
					// OnClose
					() => setDialog(null),
					// OnSave
					addItemToLoadout
				)}
		</>
	)
}

LoadoutResourceList.propTypes = {
	resourceType: PropTypes.oneOf(['clothing', 'gear', 'attachments'] as const).isRequired,
	items: PropTypes.arrayOf(PropTypes.shape(ArmoryItemPropShape).isRequired).isRequired,
	canAdd: PropTypes.bool.isRequired,
	addItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	renderAddDialog: PropTypes.func.isRequired,
	gridItemProps: PropTypes.object,
}

LoadoutResourceList.defaultProps = {
	gridItemProps: {},
}

export default LoadoutResourceList
