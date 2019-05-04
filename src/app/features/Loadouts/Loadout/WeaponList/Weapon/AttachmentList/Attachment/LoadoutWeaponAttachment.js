import React from 'react'
import PropTypes from 'prop-types'

import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'

const fillParent = {
	width: '100%',
	height: '100%'
} 

export default function LoadoutWeaponAttachment({ attachment, onDelete }) {
	return (
		<div style={ {
			...fillParent,
			...{ position: 'relative'} 
		} }>
			<span style={ {
				position: 'absolute',
				bottom: 0, 
				right: 0, 
				fontSize: '16px'
			} }>
				{attachment.getTitle()}
			</span>

			<ArmoryItemImage 
				style={ fillParent } 
				entity={ attachment } category={ 'attachments' } />
		</div>
	)
}

LoadoutWeaponAttachment.propTypes = {
	attachment: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired
	}).isRequired,
	onDelete: PropTypes.func
}

LoadoutWeaponAttachment.defaultProps = {
	onDelete: (attachmentId) => {}
}