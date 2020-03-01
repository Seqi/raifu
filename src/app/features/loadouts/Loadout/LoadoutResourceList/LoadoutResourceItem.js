import React from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import ResourceImage from 'app/shared/images/ResourceImage'

const RelativeContainer = styled(Box)({
	position: 'relative',
	height: '100%',
})

const ResourceImageTitle = styled(Box)({
	position: 'absolute',
	bottom: '10px', 
	right: 0, 
	fontSize: '16px',	
})


export default function LoadoutResourceItem({ resourceType, item, canDelete, onDelete }) {
	return (
		<RelativeContainer>
			<DeletableOverlay 
				canDelete={ canDelete } 
				onDelete={ () => onDelete(item.id) }
				dialogTitle={ item.getTitle() }
			>
				<ResourceImage
					resource={ item } 
					resourceType={ resourceType }
					rotate={ resourceType === 'attachments' } 
				/>

				<ResourceImageTitle>
					{ item.getTitle() }
				</ResourceImageTitle>
			</DeletableOverlay>
		</RelativeContainer>
	)
}

LoadoutResourceItem.propTypes = {
	resourceType: PropTypes.oneOf(['attachments', 'gear', 'clothing']).isRequired,
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func
}

LoadoutResourceItem.defaultProps = {
	canDelete: false,
	onDelete: (itemId) => {}
}
