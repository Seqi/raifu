import React from 'react'
import PropTypes from 'prop-types'

import AddButton from 'app/shared/components/buttons/AddButton'
import useIsMobileMode from 'app/shared/hooks/useIsMobileMode'

export default function LoadoutAdd({ onClick }) {
	let isMobileMode = useIsMobileMode()

	return (
		<div style={ {
			width: '100%',
			height: isMobileMode ? '125px' : '250px',
		} }>
			<AddButton onClick={ onClick } />
		</div>
	)
}

LoadoutAdd.propTypes = {
	onClick: PropTypes.func.isRequired
}