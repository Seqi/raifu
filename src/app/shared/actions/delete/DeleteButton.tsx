import { FC, MouseEventHandler } from 'react'
import PropTypes from 'prop-types'

import { IconButton, styled } from '@material-ui/core'

const DeleteButtonContainer = styled(IconButton)(({ theme }) => ({
	fontSize: '1.1rem',
	color: theme.palette.text.secondary,
}))

type DeleteButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
	return (
		<DeleteButtonContainer onClick={ onClick }>
			<i className='fa fa-times' />
		</DeleteButtonContainer>
	)
}

DeleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export default DeleteButton
