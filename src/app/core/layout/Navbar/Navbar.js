import './Navbar.css'
import React, { Component } from 'react'
import AuthenticatedUserMenu from './AuthenticatedUserMenu'
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu'

import auth from '../../../../firebase/auth'

class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: auth.user
		}

		this.authUnsubscribe = auth.onAuthChanged((user) => {
			this.setState({ user })
		})
	}

	componentWillUnmount() {
		this.authUnsubscribe()
	}

	render() {
		return (
			<div className='navbar'>
				<div className='user-menu'>
					{ this.state.user && <AuthenticatedUserMenu user={ this.state.user } /> }
					{ !this.state.user && <UnauthenticatedUserMenu /> }
				</div>
			</div>
		)
	}
}

export default Navbar
