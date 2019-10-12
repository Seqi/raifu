import React from 'react'
import PropTypes from 'prop-types'
import { withTheme, Typography } from '@material-ui/core'

import './HomePageSegment.css'

function HomePageSegment({title, text, image, flip, isMobileMode, theme}) {
	return (
		<div className='segment-container' style={ { 
			flexDirection: flip ? 'row-reverse' : 'row',
			borderTop: `1px solid ${theme.palette.primary.main}`
		} }>
			<div>
				<img className='segment-image' alt='Inventory management' src={ image } />
			</div>
			<div className='segment-text-container'>
				<div>
					<Typography variant={ isMobileMode ? 'h3' : 'h2' }>{ title }</Typography>
					<span className='segment-text'>
						{ text }
					</span>
				</div>
			</div>
		</div>
	)
}

HomePageSegment.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	image: PropTypes.any.isRequired, // Temp any
	flip: PropTypes.bool,
	isMobileMode: PropTypes.bool.isRequired
}

HomePageSegment.defaultProps = {
	flip: false
}

export default withTheme(HomePageSegment)