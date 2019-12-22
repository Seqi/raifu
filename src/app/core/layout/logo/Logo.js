import React from 'react'
import PropTypes from 'prop-types'

import Ump45 from 'assets/ump45.png'
import './Logo.css'

function Logo({ title, subtitle, height }) {
	return (
		<div>
			<div className='logo-box'>
				<div>
					<div className='title'>{title}</div>
					{ subtitle && <div>{subtitle}</div> }
				</div>
				<img style={ {height: height || 'initial' } } src={ Ump45 } alt='' />
			</div>
		</div>
	)
}

Logo.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	height: PropTypes.string,
}

Logo.defaultProps = {
	title: 'Raifu',
	subtitle: undefined,
	height: undefined
}

export default Logo