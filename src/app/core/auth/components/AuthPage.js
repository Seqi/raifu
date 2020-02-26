import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Box, styled } from '@material-ui/core'

import UserContext from '../contexts/UserContext'
import Logo from 'app/core/layout/Logo'

import LoginCard from './LoginCard/LoginCard'
import SignupCard from './SignupCard/SignupCard'

let AuthFormContainer = styled(Box)({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	maxWidth: '600px'
})

function AuthPage({ history }) {
	let user = useContext(UserContext)

	useEffect(() => { user && history.push('/app') }, [user, history])

	return (
		<div>		
			<Logo width='500px' />

			<AuthFormContainer>
				<Router basename='/login'>
					<Switch>
						<Route path='/signup' component={ SignupCard } />
						<Route path='/' component={ LoginCard } />
					</Switch>
				</Router>
			</AuthFormContainer>
		</div>
	)
}

export default AuthPage
