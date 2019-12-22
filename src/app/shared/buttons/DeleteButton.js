import React from 'react'
import PropTypes from 'prop-types'

import './DeleteButton.css'

const DeleteButton = ({ onClick, style }) => {
	return (
		<button type='button' className='avatar-button delete-button' style={ style } onClick={ onClick }>
			<i className='fa fa-times' />
		</button>
	)
}

DeleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	style: PropTypes.object
}

DeleteButton.defaultProps = {
	style: {}
}

export default DeleteButton
