import React from 'react'
import PropTypes from 'prop-types'

import AddButton from 'app/shared/components/Buttons/AddButton'

export default function LoadoutAdd({ onClick }) {
	return (
		<div style={ {
			width: '100%',
			height: '250px',
		} }>
			<AddButton onClick={ onClick } />
		</div>
	)
}

LoadoutAdd.propTypes = {
	onClick: PropTypes.func.isRequired
}