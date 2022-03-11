import { FC } from 'react'
import PropTypes from 'prop-types'

import { Icon, IconButton } from '@material-ui/core'

type LoginProvidersProps = {
	loginWithTwitter: () => Promise<any>
	loginWithGoogle: () => Promise<any>
}

const LoginProviders: FC<LoginProvidersProps> = ({
	loginWithTwitter,
	loginWithGoogle,
}) => {
	return (
		<div>
			<IconButton id='twitter-icon' onClick={loginWithTwitter}>
				<Icon color='primary' className='fab fa-twitter' />
			</IconButton>

			<IconButton id='google-icon' onClick={loginWithGoogle}>
				<Icon color='primary' className='fab fa-google' />
			</IconButton>
		</div>
	)
}

LoginProviders.propTypes = {
	loginWithTwitter: PropTypes.func.isRequired,
	loginWithGoogle: PropTypes.func.isRequired,
}

export default LoginProviders
