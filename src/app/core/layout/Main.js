import './Main.css'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import auth from '../../../firebase/auth'
import Navbar from './Navbar/Navbar'

class Main extends Component {
	constructor(props) {
		super(props)

		if (!auth.user) {
			this.props.history.push('/login')
		}

		auth.onAuthChanged((user) => {
			if (!user) {
				this.props.history.push('/login')
			}
		})
	}

	render() {
		return (
			auth.user && (
				<div>
					<Navbar />
					Welcome to the app!
				</div>
			)
		)
	}
}

export default withRouter(Main)
