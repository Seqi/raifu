import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import './HomePageSegment.css'

function HomePageSegment({ title, text, image, flip, isMobileMode }) {
	let theme = useTheme()
	
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
					<ReactiveTitle 
						variant={ 'h2' } 
						mobileVariant={ 'h3' }
						style={ { padding: isMobileMode ? '16px' : '24px' } }
					>
						{ title }
					</ReactiveTitle>

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

export default HomePageSegment