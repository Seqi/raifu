import { FC, MouseEventHandler } from 'react'
import PropTypes from 'prop-types'

import { IconButton, styled } from '@material-ui/core'

const DeleteButtonContainer = styled(IconButton)(({ theme }) => ({
	fontSize: '1.1rem',
	color: theme.palette.text.secondary,

	[theme.breakpoints.down('xs')]: {
		padding: theme.spacing(0.5),
		fontSize: '0.9rem',
	},
}))

type DeleteButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>
	small?: boolean
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick, small }) => {
	return (
		<DeleteButtonContainer size={ small ? 'small' : 'medium' } onClick={ onClick }>
			<i className='fa fa-times' />
		</DeleteButtonContainer>
	)
}

DeleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	small: PropTypes.bool,
}

DeleteButton.defaultProps = {
	small: false,
}

export default DeleteButton
