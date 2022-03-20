import { FC, useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Box, styled } from '@material-ui/core'

import { Logo } from 'app/core/layout'

import UserContext from '../contexts/UserContext'

let AuthFormContainer = styled(Box)({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	maxWidth: '600px',
})

const AuthPage: FC = () => {
	const navigate = useNavigate()
	let user = useContext(UserContext)

	useEffect(() => {
		user && navigate('/app', { replace: true })
	}, [user, navigate])

	return (
		<div>
			<Logo pt={4} maxWidth='75%' marginX='auto' width='500px' />

			<AuthFormContainer>
				<Outlet />
			</AuthFormContainer>
		</div>
	)
}

export default AuthPage
