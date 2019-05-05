import React from 'react'
import PropType from 'prop-types'

import { withTheme } from '@material-ui/core'

import { AttachmentCard } from 'app/shared/components/Cards/Entities'

function AttachmentSelect ({theme, attachments, selectedAttachmentIds, onAttachmentSelected }) {

	const cardStyle = {
		height: '220px',
		width: '30%',
		minWidth: '0',
		marginRight: '0'
	}
	
	const selectedCardStyle = {
		...cardStyle,
		transform: 'scale(1.05)',
		border: `1px solid ${theme.palette.primary.main}`
	}

	return (
		<div className='loadout-select-list'>
			{ attachments.map(attachment => (
				<AttachmentCard key={ attachment.id } 
					attachment={ attachment } 
					style={ selectedAttachmentIds.find(id => id === attachment.id) ? selectedCardStyle : cardStyle }
					onClick={ () => onAttachmentSelected(attachment.id) } />
			))}
		</div>
	)
}

AttachmentSelect.propTypes = {
	attachments: PropType.array,
	selectedAttachmentIds: PropType.arrayOf(PropType.string),
	onAttachmentSelected: PropType.func
}

AttachmentSelect.defaultProps = {
	attachments: [],
	selectedAttachmentIds: [],
	onAttachmentSelected: (attachment) => {}
}

export default withTheme()(AttachmentSelect)