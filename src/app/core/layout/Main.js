import './Main.css'
import './Cards.css'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Navbar from './Navbar/Navbar'
import Armory from '../../features/Armory/Armory'
import Loadouts from '../../features/Loadouts/Loadouts'
import auth from '../../../firebase/auth'

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tabIndex: 0
		}

		if (!auth.user) {
			this.props.history.push('/login')
		}

		auth.onAuthChanged((user) => {
			if (!user) {
				this.props.history.push('/login')
			}
		})
	}

	tabChange(evt, tabIndex) {
		this.setState({ tabIndex })
	}

	render() {
		let { tabIndex } = this.state

		return auth.user ? (
			<React.Fragment>
				<Navbar />

				<Tabs centered={ true } value={ tabIndex } onChange={ (evt, idx) => this.tabChange(evt, idx) }>
					<Tab label='Armory' />
					<Tab label='Loadouts' />
				</Tabs>

				<div className='app-window'>
					{tabIndex === 0 && <Armory />}
					{tabIndex === 1 && <Loadouts />}
				</div>
			</React.Fragment>
		) : (
			<div />
		)
	}
}

export default withRouter(Main)
