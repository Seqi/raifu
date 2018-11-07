import React, { Component } from 'react'
import './App.css'

class App extends Component {
	render() {
		return (
			<div className='app'>
				<div className='nav-bar'>
					<div className='nav-left'>
						<span className='title'>Raifu</span>
					</div>
					<div className='nav-right'>
						<span>Login</span>
					</div>
				</div>
			</div>
		)
	}
}

export default App
