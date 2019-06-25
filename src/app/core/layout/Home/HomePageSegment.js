import React from 'react'
import PropTypes from 'prop-types'

import './HomePageSegment.css'

function HomePageSegment({text, image}) {
	return (
		<div className='segment-container'>
			<div>
				<img className='segment-image' alt='Inventory management' src={ image } />
			</div>
			<div>
				<div className='segment-text-container'>
					{ text }
				</div>
			</div>
		</div>
	)
}

HomePageSegment.propTypes = {
	text: PropTypes.string.isRequired,
	image: PropTypes.any.isRequired // Temp any
}

export default HomePageSegment