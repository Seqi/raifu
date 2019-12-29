import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import AddButton from 'app/shared/buttons/AddButton'

import { LoadoutContext } from 'app/features/loadouts'
import LoadoutResourceItem from './LoadoutResourceItem'
import './LoadoutResourceList.css'

let LoadoutResourceList = ({ resourceType, items, addItem, deleteItem, renderAddDialog }) => {
	let [dialog, setDialog] = useState(null)
	let { editable } = useContext(LoadoutContext)

	let addItemToLoadout = useCallback(async (itemIds) => {
		await addItem(itemIds)
		setDialog(null)
	}, [addItem])

	return (
		<React.Fragment>
			<div className='loadout-resource-list-container'>				
				{ 
					items.map(item => (
						<div key={ item.id } className='loadout-resource-list-item'>
							<LoadoutResourceItem
								resourceType={ resourceType } 
								item={ item }
								canDelete={ editable }
								onDelete={ deleteItem } />
						</div>
					)) 
				}

				{ editable && 
					<div className='loadout-resource-list-item'>
						<AddButton onClick={ () => setDialog('add') } />
					</div>
				}
			</div>

			{editable && 
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
	resourceType: PropTypes.oneOf(['clothing', 'gear']).isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
	})).isRequired,
	addItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	renderAddDialog: PropTypes.func.isRequired
}

export default LoadoutResourceList