import React from 'react'
import PropTypes from 'prop-types'

import ArmoryCard from './ArmoryCard'

let AttachmentCard = ({ resource, ...props }) => <ArmoryCard resource={ resource } resourceType='attachments' { ...props } />

export default AttachmentCard

AttachmentCard.propTypes = {
	resource: PropTypes.object.isRequired,
}