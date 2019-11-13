import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

function LoadoutSeparator(props) {
	return (
		<div className='loadout-separator-item' style={ {
			borderBottom: props.showBottom && '1px solid',
			borderColor: props.theme.palette.primary.main
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