import React, { useState, useCallback, useContext, FC } from 'react'
import PropTypes from 'prop-types'

import { Grid, Box, styled } from '@material-ui/core'

import AddButton from 'app/shared/actions/add/AddButton'

import { LoadoutContext } from 'app/features/loadouts'
import LoadoutResourceItem from './LoadoutResourceItem'
import { ArmoryItem, ArmoryItemPropShape } from 'app/shared/models/armory-item'
import { Category } from 'app/data/constants/platforms'

const LoadoutResourceItemContainer = styled(Box)(({ theme }) => ({
	flex: '1 1 auto',
	minWidth: '250px',
	maxWidth: '33%',
	minHeight: '200px',
	maxHeight: '300px',

	padding: '1rem 1.5rem',

	[theme.breakpoints.down('xs')]: {
		minWidth: '150px',
		maxWidth: '50%',
		minHeight: '100px',
		maxHeight: '200px',

		padding: '0.4rem 1rem',
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
		addItemToLoadout: (itemIds: string[]) => Promise<any>
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
			<Grid container={ true }>
				{items.map((item) => (
					<LoadoutResourceItemContainer key={ item.id }>
						<LoadoutResourceItem
							resourceType={ resourceType }
							item={ item }
							canDelete={ editable }
							onDelete={ deleteItem }
						/>
					</LoadoutResourceItemContainer>
				))}

				{editable && canAdd && (
					<LoadoutResourceItemContainer>
						<AddButton onClick={ () => setDialog('add') } />
					</LoadoutResourceItemContainer>
				)}
			</Grid>

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
