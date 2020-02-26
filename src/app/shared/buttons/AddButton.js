import React from 'react'
import PropTypes from 'prop-types'

import { Box, IconButton, styled } from '@material-ui/core'

const AddIconButton = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translateX(-50%) translateY(-50%)',

	fontSize: '4rem',

	'& i': {
		color: theme.palette.primary.main
	},
	// Disable ripple properly
	'&:hover': {
		backgroundColor: 'initial'
	}
}))

function AddButton({ onClick }) {
	return (
		<Box display='flex' flex='1' height='100%' position='relative'>
			<AddIconButton onClick={ onClick }>
				<i className='fa fa-plus' />
			</AddIconButton>
		</Box>
	)
}

AddButton.propTypes = {
	onClick: PropTypes.func
}

AddButton.defaultProps = {
	onClick: () => {}
}

export default AddButton