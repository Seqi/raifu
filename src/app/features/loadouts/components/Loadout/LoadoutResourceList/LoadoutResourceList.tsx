import React, { useState, useCallback, useContext, FC } from 'react'
import PropTypes from 'prop-types'

import { Grid, styled } from '@material-ui/core'

import { Category } from 'app/data/constants/platforms'
import { ArmoryItem, ArmoryItemPropShape } from 'app/features/armory'
import AddButton from 'app/shared/actions/add/AddButton'

import LoadoutResourceItem from './LoadoutResourceItem'
import LoadoutContext from '../LoadoutContext'

const ResourceGridItem = styled(Grid)(({ theme }) => ({
	maxHeight: '300px',
	[theme.breakpoints.down('xs')]: {
		maxHeight: '200px',
	},
}))

const ResourceGrid = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down('xs')]: {
		padding: theme.spacing(0, 2),
	},
}))

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
}

const LoadoutResourceList: FC<LoadoutResourceListProps> = ({
	resourceType,
	items,
	canAdd,
	addItem,
	deleteItem,
	renderAddDialog,
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
		<React.Fragment>
			<ResourceGrid container={ true } spacing={ 3 }>
				{items.map((item) => (
					<ResourceGridItem item={ true } key={ item.id } xs={ 4 }>
						<LoadoutResourceItem
							resourceType={ resourceType }
							item={ item }
							canDelete={ editable }
							onDelete={ deleteItem }
						/>
					</ResourceGridItem>
				))}

				{editable && canAdd && (
					<ResourceGridItem
						// Usually we can rely on the add button stretching to match
						// any items. If there are none though, we want to give it a lil height
						style={ { height: items.length === 0 ? '250px' : 'auto' } }
						item={ true }
						xs={ 4 }
					>
						<AddButton onClick={ () => setDialog('add') } />
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
		</React.Fragment>
	)
}

LoadoutResourceList.propTypes = {
	resourceType: PropTypes.oneOf(['clothing', 'gear', 'attachments'] as const).isRequired,
	items: PropTypes.arrayOf(PropTypes.shape(ArmoryItemPropShape).isRequired).isRequired,
	canAdd: PropTypes.bool.isRequired,
	addItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	renderAddDialog: PropTypes.func.isRequired,
}

export default LoadoutResourceList
