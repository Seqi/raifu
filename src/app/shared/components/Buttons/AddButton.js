import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

import './AddButton.css'

function AddButton({ theme, onClick }) {
	return (
		<div className='add-button-wrapper'>
			<button onClick={ onClick } type='button' className='add-button'>
				<i style={ { color: theme.palette.primary.main } } className='fa fa-plus' />
			</button>
		</div>
	)
}

AddButton.propTypes = {
	onClick: PropTypes.func
}

AddButton.defaultProps = {
	onClick: () => {}
}

export default withTheme()(AddButton)