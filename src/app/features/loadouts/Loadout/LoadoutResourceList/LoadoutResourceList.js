import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { Grid, Box, styled } from '@material-ui/core'

import AddButton from 'app/shared/actions/add/AddButton'

import { LoadoutContext } from 'app/features/loadouts'
import LoadoutResourceItem from './LoadoutResourceItem'

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
	}
}))

let LoadoutResourceList = ({ resourceType, items, canAdd, addItem, deleteItem, renderAddDialog }) => {
	let [dialog, setDialog] = useState(null)
	let { editable } = useContext(LoadoutContext)

	let addItemToLoadout = useCallback(async (itemIds) => {
		await addItem(itemIds)
		setDialog(null)
	}, [addItem])

	return (
		<React.Fragment>
			<Grid container={ true }>
				{ 
					items.map(item => (
						<LoadoutResourceItemContainer key={ item.id }>
							<LoadoutResourceItem
								resourceType={ resourceType } 
								item={ item }
								canDelete={ editable }
								onDelete={ deleteItem } />
						</LoadoutResourceItemContainer>
					)) 
				}

				{ editable && canAdd &&
				<LoadoutResourceItemContainer>
					<AddButton onClick={ () => setDialog('add') } />
				</LoadoutResourceItemContainer>
				}
			</Grid>			

			{editable && canAdd &&
				renderAddDialog(
					// Is Open
					dialog === 'add',
					// OnClose
					() => setDialog(null),
					// OnSave
					addItemToLoadout
				)
			}
		</React.Fragment>
	)
}

LoadoutResourceList.propTypes = {
	resourceType: PropTypes.oneOf(['clothing', 'gear', 'attachments']).isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
	})).isRequired,
	canAdd: PropTypes.bool.isRequired,
	addItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	renderAddDialog: PropTypes.func.isRequired
}

export default LoadoutResourceList