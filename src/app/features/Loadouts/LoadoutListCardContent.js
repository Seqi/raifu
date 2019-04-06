import './LoadoutListCardContent.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getImage } from 'app/shared/services/card-image-service'
import RotatedImage from 'app/shared/components/Images/RotatedImage'

class LoadoutListCardContent extends Component {
	getImages(weapons) {
		let images = []

		Object.keys(weapons)
			.forEach((weaponId) => {
				let weapon = weapons[weaponId]

				let weaponImage = getImage('weapons', weapon.type, weapon.platform)
				if (weaponImage) {
					images.push({ rotate: 45, img: weaponImage })
				}
			})

		return images
	}

	render() {
		let images = this.getImages(this.props.weapons)

		return (
			<div className='loadout-list-item-container'>
				{images.map((image, idx) => (
					<RotatedImage key={ idx } rotateBy={ image.rotate } image={ image.img } />
				))}
			</div>
		)
	}
}

LoadoutListCardContent.propTypes = {
	weapons: PropTypes.array.isRequired
}

export default LoadoutListCardContent
