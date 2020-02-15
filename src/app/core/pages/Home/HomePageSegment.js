import React from 'react'
import PropTypes from 'prop-types'
import { useTheme, Typography } from '@material-ui/core'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import './HomePageSegment.css'

function HomePageSegment({ title, text, image, showBorder, flip, isMobileMode }) {
	let theme = useTheme()
	
	return (
		<div className='segment-container' style={ { 
			flexDirection: flip ? 'row-reverse' : 'row',
			borderTop: showBorder ? `3px solid ${theme.palette.primary.main}` : null
		} }>
			<div>
				<img className='segment-image' alt='Inventory management' src={ image } />
			</div>

			<div className='segment-text-container'>
				<ReactiveTitle 
					variant={ 'h2' } 
					mobileVariant={ 'h4' }
					style={ { padding: isMobileMode ? '16px' : '24px' } }
				>
					{ title }
				</ReactiveTitle>

				<Typography variant='span'>{ text }</Typography>
			</div>
		</div>
	)
}

HomePageSegment.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	image: PropTypes.any.isRequired, // Temp any,
	showBorder: PropTypes.bool.isRequired,
	flip: PropTypes.bool,
	isMobileMode: PropTypes.bool.isRequired
}

HomePageSegment.defaultProps = {
	flip: false
}

export default HomePageSegment