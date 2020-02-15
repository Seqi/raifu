import React from 'react'
import PropTypes from 'prop-types'

import LogoImage from 'assets/home/logo.png'
import useIsMobileMode from 'app/shared/hooks/useIsMobileMode'

let Logo = ({ width, maxWidth }) => {
	let isMobileMode = useIsMobileMode()

	return (
		<div
			style={ {
				maxWidth: maxWidth,
				width: width,
				margin: '0 auto',
				paddingTop: isMobileMode ? '24px' : '0px',
				paddingBottom: '24px',
			} }
		>
			<img style={ { width: '100%' } } src={ LogoImage } alt='Raifu Airsoft Loadout Management' />
		</div>
	)
}

Logo.propTypes = {
	width: PropTypes.string,
	maxWidth: PropTypes.string,
}

Logo.defaultProps = {
	width: '750px',
	maxWidth: '95%'
}

export default Logo
