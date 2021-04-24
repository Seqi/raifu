import { FC, useContext, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	RouteComponentProps,
} from 'react-router-dom'

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
	maxWidth: '600px',
})

type AuthPageProps = RouteComponentProps

const AuthPage: FC<AuthPageProps> = ({ history }) => {
	let user = useContext(UserContext)

	useEffect(() => {
		user && history.push('/app')
	}, [user, history])

	return (
		<div>
			<Logo pt={ 4 } maxWidth='95%' marginX='auto' width='500px' />

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
