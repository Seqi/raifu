import './Navbar.css'
import React, { Component } from 'react'
import User from './User'

class Navbar extends Component {
	render() {
		return (
			<div className='navbar'>
				<div className='user-menu'>
					<User />
				</div>
			</div>
		)
	}
}

export default Navbar
