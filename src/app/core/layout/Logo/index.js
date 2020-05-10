import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import LogoImage from 'assets/home/logo.png'

let Logo = ({ width }) => {
	return (
		<Box width={width} maxWidth='95%' marginX='auto' pt={4}>
			<img style={{ width: '100%' }} src={LogoImage} alt='Raifu Airsoft Loadout Management' />
		</Box>
	)
}

Logo.propTypes = {
	width: PropTypes.string,
}

Logo.defaultProps = {
	width: '750px',
}

export default Logo
