import React from 'react'
import PropTypes from 'prop-types'

const CardDeleteButton = ({ onClick }) => {
	return (
		<button type='button' className='avatar-button card-action' onClick={ onClick }>
			<i className='fa fa-times' />
		</button>
	)
}

CardDeleteButton.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default CardDeleteButton
