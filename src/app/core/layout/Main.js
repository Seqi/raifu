import './Main.css'

import React, { Component } from 'react'
import { withRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Navbar from 'app/core/layout/Navbar/Navbar'
import Armory from 'app/features/Armory/Armory'
import Loadouts from 'app/features/Loadouts/Loadouts'
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
					<Tab label='Armory' component={ Link } to={ '/app/armory' } />
					<Tab label='Loadouts' component={ Link } to={ '/app/loadouts' } />
				</Tabs>

				<div className='app-window'>
					<Switch>
						<Route path={ '/app/armory' } component={ Armory } />
						<Route path={ '/app/loadouts' } component={ Loadouts } />
						<Redirect from={ '/app' } to={ '/app/armory' } />
					</Switch>
				</div>
			</React.Fragment>
		) : (
			<div />
		)
	}
}

export default withRouter(Main)
