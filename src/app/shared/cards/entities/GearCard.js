import React from 'react'
import PropTypes from 'prop-types'

import ArmoryCard from './ArmoryCard'

let GearCard = ({ resource, ...props }) => <ArmoryCard resource={ resource } resourceType='gear' { ...props } />

export default GearCard

GearCard.propTypes = {
	resource: PropTypes.object.isRequired,
}