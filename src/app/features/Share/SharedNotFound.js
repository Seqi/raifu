import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

function SharedNotFound({ entityName }) {
	return (
		<div>
			<Typography style={ {textAlign: 'center'} } variant='h3'>{ entityName } not found.</Typography>
		</div>
	)
}

SharedNotFound.propTypes = {
	entityName: PropTypes.oneOf(['Loadout']).isRequired
}

export default SharedNotFound