import React from 'react'
import PropTypes from 'prop-types'

import ArmoryCard from './ArmoryCard'

let WeaponCard = ({ resource, ...props }) => <ArmoryCard resource={ resource } resourceType='weapons' { ...props } />

export default WeaponCard

WeaponCard.propTypes = {
	resource: PropTypes.object.isRequired,
}
