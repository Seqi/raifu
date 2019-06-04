import './Main.css'

import React, { Component } from 'react'
import { withRouter, BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Navbar from 'app/core/layout/Navbar/Navbar'
import Armory from 'app/features/Armory/Armory'
import Loadouts from 'app/features/Loadouts/Loadouts'
import Events from 'app/features/Events/Events'
import AuthenticatedRoute from 'app/shared/components/Auth/AuthenticatedRoute'

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tabIndex: this.getTabIndex()
		}
	}

	// Fixes active tab on direct navigations
	getTabIndex() {
		let idxMap = [
			{ path: '/armory', idx: 0 },
			{ path: '/loadouts', idx: 1 },
			{ path: '/events', idx: 2 },
		]

		let currPath = this.props.location.pathname

		for (let map of idxMap) {
			if (currPath.indexOf(map.path) > -1) {
				return map.idx
			}
		}

		return 0
	}

	tabChange(evt, tabIndex) {
		this.setState({ tabIndex })
	}

	onAuthFailure() {
		this.props.history.push('/login')
	}

	render() {
		let { tabIndex } = this.state

		return (
			<React.Fragment>				
				<Navbar />
				<Router basename='/app'>
					<React.Fragment>
						<Tabs centered={ true } value={ tabIndex } onChange={ (evt, idx) => this.tabChange(evt, idx) }>
							<Tab label='Armory' component={ Link } to='/armory' />
							<Tab label='Loadouts' component={ Link } to='/loadouts' />
							<Tab label='Events' component={ Link } to='/events' />
						</Tabs>

						<div className='app-window'>
							<Switch>
								<AuthenticatedRoute path='/armory' component={ Armory } onFail={ () => this.onAuthFailure() } />
								<AuthenticatedRoute path='/loadouts' component={ Loadouts } onFail={ () => this.onAuthFailure() }  />
								<AuthenticatedRoute path='/events' component={ Events } onFail={ () => this.onAuthFailure() }  />
								<Redirect from='/' to='/armory' />
							</Switch>
						</div>
					</React.Fragment>
				</Router>
			</React.Fragment>
		)
	}
}

export default withRouter(Main)
