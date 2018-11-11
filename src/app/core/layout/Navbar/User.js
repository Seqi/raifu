import './User.css'
import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'

import auth from '../../../../firebase/auth'

class User extends Component {
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
		let isOpen = !!anchor

		return (
			<div className='user-profile'>
				<span className='user-name'>{auth.user.displayName || auth.user.email}</span>
				<button type='button' className='avatar-button' onClick={ this.handleMenu }>
					{auth.user.photoURL ? (
						<Avatar
							alt={ auth.user.displayName || auth.user.email }
							src={ auth.user.photoURL }
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

export default User
