import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import auth from '../../../../firebase/auth'

import './AuthenticatedUserMenu.css'

class AuthenticatedUserMenu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			anchor: null
		}
	}

	get isHomePage() {
		return window.location.pathname.indexOf('app') === -1
	}

	handleMenu = (event) => {
		this.setState({ anchor: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ anchor: null })
	}

	goToApp() {
		this.props.history.push('/app')
	}

	logout() {
		this.handleClose()
		auth.logout()
			.then(() => this.props.history.push('/login'))
	}

	render() {
		let { anchor } = this.state
		let { user } = this.props
		let isOpen = !!anchor

		return (
			<React.Fragment>
				{ this.isHomePage && (
					<div style={ {flex: 1} }>
						<Button onClick={ () => this.goToApp() } variant='outlined' color='primary'>Go to app</Button>
					</div>
				)}

				<div className='user-profile'>
					<span className='user-name'>{user.displayName || user.email}</span>
				
					<button type='button' className='avatar-button' onClick={ this.handleMenu }>
						{user.photoURL ? (
							<Avatar
								alt={ user.displayName || user.email }
								src={ user.photoURL }
								aria-owns={ isOpen ? 'auth-menu' : undefined }
								aria-haspopup='true'
							/>
						) : (
							<i className='avatar-icon fa fa-user' />
						)}
					</button>

					<Menu
						id='auth-menu'
						anchorEl={ anchor }
						open={ isOpen }
						onClose={ this.handleClose }
						anchorOrigin={ {
							vertical: 'top',
							horizontal: 'right'
						} }
						transformOrigin={ {
							vertical: 'top',
							horizontal: 'right'
						} }
					>
						<MenuItem onClick={ () => this.logout() }>Logout</MenuItem>
					</Menu>
				</div>
			</React.Fragment>
		)
	}
}

AuthenticatedUserMenu.propTypes = {
	user: PropTypes.shape({
		displayName: PropTypes.string,
		email: PropTypes.string,
		photoURL: PropTypes.string
	}).isRequired
}

export default withRouter(AuthenticatedUserMenu)
