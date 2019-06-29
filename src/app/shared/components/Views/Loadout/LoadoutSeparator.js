import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

function LoadoutSeparator(props) {
	let borderStyle = `1px solid ${props.theme.palette.primary.main}`

	return (
		<div style={ {			
			width: '100%',
			paddingTop: '24px',
			paddingBottom: '24px',		
			marginTop: '24px',
			marginBottom: '24px',
			borderTop: borderStyle,
			borderBottom: props.showBottom && borderStyle
		} }>
			{ props.children }
		</div>
	)
}		

LoadoutSeparator.propTypes = {
	showBottom: PropTypes.bool
}

LoadoutSeparator.defaultProps = {
	showBottom: false
}

export default withTheme()(LoadoutSeparator)