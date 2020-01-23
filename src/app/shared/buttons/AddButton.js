import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

const buttonStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translateX(-50%) translateY(-50%)',

	backgroundColor: 'inherit',
	cursor: 'pointer',
	border: '0',
	borderRadius: '50%',

	fontSize: '4rem',
}

function AddButton({ theme, onClick }) {
	return (
		<div style={ { position: 'relative', height: '100%' } }>
			<button onClick={ onClick } type='button' style={ buttonStyle }>
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

export default withTheme(AddButton)