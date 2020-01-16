import React from 'react'
import PropTypes from 'prop-types'

import ArmoryCard from './ArmoryCard'

let ClothingCard = ({ resource, ...props }) => <ArmoryCard resource={ resource } resourceType='clothing' { ...props } />

export default ClothingCard

ClothingCard.propTypes = {
	resource: PropTypes.object.isRequired,
}
