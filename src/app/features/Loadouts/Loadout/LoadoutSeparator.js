import React from 'react'
import PropTypes from 'prop-types'

import { useTheme } from '@material-ui/core'

let LoadoutSeparator = ({ children, showBottom }) => {
	let theme = useTheme()

	return (
		<div className='separator-padding' style={ {
			borderTop: '1px solid',
			borderBottom: showBottom && '1px solid',
			borderColor: theme.palette.primary.main
		} }>
			{ children }
		</div>
	)
}		

LoadoutSeparator.propTypes = {
	showBottom: PropTypes.bool
}

LoadoutSeparator.defaultProps = {
	showBottom: false
}

export default LoadoutSeparator