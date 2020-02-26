import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Box, Button, Link } from '@material-ui/core'

let AuthCardActions = ({ to, text }) => {
	return (
		<Box marginLeft='auto'>
			<Button size='small' >
				<Link 
					to={ to }
					underline='none' 
					color='textPrimary' 
					component={ RouterLink } 
				>
					{ text }
				</Link>
			</Button>
		</Box>
	)
}

AuthCardActions.propTypes = {
	to: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
}

export default AuthCardActions
