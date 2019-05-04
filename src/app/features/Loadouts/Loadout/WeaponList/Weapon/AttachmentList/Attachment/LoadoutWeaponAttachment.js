import React from 'react'
import PropTypes from 'prop-types'

import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'

export default function LoadoutWeaponAttachment({ attachment, onDelete }) {
	return (
		<ArmoryItemImage 
			style={ {
				width: '100%',
				height: '100%'
			} } 
			entity={ attachment } category={ 'attachments' } />
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