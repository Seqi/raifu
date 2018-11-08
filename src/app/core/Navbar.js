import './Navbar.css'
import React, { Component } from 'react'

class Navbar extends Component {
	render() {
		return (
			<div className='nav-bar'>
				<div className='nav-left'>
					<span className='title'>Raifu</span>
				</div>
				<div className='nav-right'>
					<button type='button'>Login</button>
				</div>
			</div>
		)
	}
}

export default Navbar
