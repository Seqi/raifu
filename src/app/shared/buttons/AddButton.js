import React from 'react'
import PropTypes from 'prop-types'

import { Box, withTheme, IconButton } from '@material-ui/core'

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
		<Box display='flex' flex='1' height='100%' position='relative'>
			<IconButton onClick={ onClick } type='button' style={ buttonStyle }>
				<i style={ { color: theme.palette.primary.main } } className='fa fa-plus' />
			</IconButton>
		</Box>
	)
}

AddButton.propTypes = {
	onClick: PropTypes.func
}

AddButton.defaultProps = {
	onClick: () => {}
}

export default withTheme(AddButton)