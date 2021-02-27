import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import AddButton from 'app/shared/actions/add/AddButton'

export default function LoadoutAdd({ onClick }) {
	return (
		<Box width='100%' paddingY={ { xs: 12, sm: 18 } }>
			<AddButton onClick={ onClick } />
		</Box>
	)
}

LoadoutAdd.propTypes = {
	onClick: PropTypes.func.isRequired
}
