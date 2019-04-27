import './UserMenu.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'

import auth from '../../../../firebase/auth'

class UserMenu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			anchor: null
		}
	}

	handleMenu = (event) => {
		this.setState({ anchor: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ anchor: null })
	}

	logout() {
		this.handleClose()
		auth.logout()
	}

	render() {
		let { anchor } = this.state
		let { user } = this.props
		let isOpen = !!anchor

		return (
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
		)
	}
}

UserMenu.propTypes = {
	user: PropTypes.shape({
		displayName: PropTypes.string,
		email: PropTypes.string,
		photoURL: PropTypes.string
	}).isRequired
}

export default UserMenu
