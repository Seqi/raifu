import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, styled } from '@material-ui/core'

const DeleteButtonContainer = styled(
	({ absolute, ...other }) => <IconButton { ...other } />
)(({ theme, absolute }) => ({
	position: absolute ? 'absolute' : 'initial',
	top: 0,
	right: 0,
	fontSize: '1.1rem',
	color: theme.palette.text.secondary
}))

const DeleteButton = ({ absolute, onClick }) => {
	return (
		<DeleteButtonContainer absolute={ absolute } onClick={ onClick }>
			<i className='fa fa-times' />
		</DeleteButtonContainer>
	)
}

DeleteButton.propTypes = {
	absolute: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
}

DeleteButton.defaultProps = {
	absolute: true
}

export default DeleteButton
