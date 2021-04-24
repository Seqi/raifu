import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, BoxProps } from '@material-ui/core'

import LogoImage from './logo.png'
import LogoNoTextImage from './logo-no-text.png'

type LogoProps = BoxProps & { subtitle?: boolean }

const Logo: FC<LogoProps> = ({ subtitle, ...props }) => {
	return (
		<Box { ...props }>
			<img
				style={ { width: '100%' } }
				src={ subtitle ? LogoImage : LogoNoTextImage }
				alt='Raifu Airsoft Loadout Management'
			/>
		</Box>
	)
}

Logo.propTypes = {
	subtitle: PropTypes.bool,
}

Logo.defaultProps = {
	subtitle: true,
}

export default Logo
