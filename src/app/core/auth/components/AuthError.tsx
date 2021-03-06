import { FC } from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

type AuthErrorProps = {
	message: string
}

const AuthError: FC<AuthErrorProps> = ({ message }) => {
	return (
		<Typography color='primary' align='center' variant='h6'>
			{message}
		</Typography>
	)
}

AuthError.propTypes = {
	message: PropTypes.string.isRequired,
}

export default AuthError
