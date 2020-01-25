import React from 'react'
import PropTypes from 'prop-types'

import Deletable from 'app/shared/actions/Deletable'
import LoadoutResourceItem from './LoadoutResourceItem'

import './LoadoutResourceItemContainer.css'

export default function LoadoutResourceItemContainer ({ resourceType, item, canDelete, onDelete }) {
	return (
		<div className='loadout-item'>
			<Deletable 
				canDelete={ canDelete } 
				onDelete={ () => onDelete(item.id) }
				title={ item.getTitle() }
			>
				<LoadoutResourceItem item={ item } resourceType={ resourceType } />
			</Deletable>
		</div>
	)
}

LoadoutResourceItemContainer.propTypes = {
	resourceType: PropTypes.oneOf(['attachments', 'gear', 'clothing']).isRequired,
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func
}

LoadoutResourceItemContainer.defaultProps = {
	canDelete: false,
	onDelete: (itemId) => {}
}
