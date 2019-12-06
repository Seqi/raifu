import './SignupPage.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import authClient from '../../../../../firebase/auth'
import SignupForm from './SignupForm'
import AuthError from '../AuthError'
import AuthCardHeader from '../AuthCardHeader'

class LoginPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			errorMessage: ''
		}
	}

	error(message) {
		this.setState({ error: true, errorMessage: message })
	}

	signupWithEmail(email, pass) {
		authClient.signup.withEmail(email, pass)
			.catch((err) =>
				this.setState({
					error: true,
					errorMessage: err.message
				})
			)
	}

	render() {
		return (
			<Card>
				<AuthCardHeader title='Sign up' />
				<CardContent>
					{this.state.error && <AuthError message={ this.state.errorMessage } />}
					<SignupForm onSubmit={ (email, pass) => this.signupWithEmail(email, pass) } />

					<div className='login-signup'>
						<Link to='../'>Already have an account? Log in</Link>
					</div>
				</CardContent>
			</Card>
		)
	}
}

export default LoginPage
