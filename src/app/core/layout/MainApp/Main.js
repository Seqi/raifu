import './Main.css'

import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Armory from 'app/features/Armory/Armory'
import Loadouts from 'app/features/Loadouts/Loadouts'
import Events from 'app/features/Events/Events'
import AuthenticatedRoute from 'app/shared/components/Auth/AuthenticatedRoute'

let  Main = ({ history, location }) => {
	let [tabIndex, setTabIndex] = useState(() => {
		// Fixes active tab on direct navigations
		let idxMap = [
			{ path: '/armory', idx: 0 },
			{ path: '/loadouts', idx: 1 },
			{ path: '/events', idx: 2 },
		]
	
		let currPath = location.pathname
	
		for (let map of idxMap) {
			if (currPath.indexOf(map.path) > -1) {
				return map.idx
			}
		}
	
		return 0
	})

	let onAuthFailure = useCallback(() => history.push('/login'), [history])

	return (
		<React.Fragment>
			<Router basename='/app'>
				<React.Fragment>
					<Tabs centered={ true } value={ tabIndex } onChange={ (evt, idx) => setTabIndex(idx) }>
						<Tab label='Armory' component={ Link } to='/armory' />
						<Tab label='Loadouts' component={ Link } to='/loadouts' />
						<Tab label='Events' component={ Link } to='/events' />
					</Tabs>

					<div className='app-window'>
						<Switch>
							<AuthenticatedRoute path='/armory' component={ Armory } onFail={ onAuthFailure } />
							<AuthenticatedRoute path='/loadouts' component={ Loadouts } onFail={ onAuthFailure }  />
							<AuthenticatedRoute path='/events' component={ Events } onFail={ onAuthFailure }  />
							<Redirect from='/' to='/armory' />
						</Switch>
					</div>
				</React.Fragment>
			</Router>
		</React.Fragment>
	)
}

export default Main
