import './Main.css'

import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom'

import { Tabs, Tab } from '@material-ui/core'

import Armory from 'app/features/armory/Armory'
import LoadoutRouter from 'app/features/loadouts/LoadoutRouter'
import EventRouter from 'app/features/events/EventRouter'
import AuthenticatedRoute from 'app/shared/auth/AuthenticatedRoute'

let Main = ({ location, history }) => {
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
						<AuthenticatedRoute path='/loadouts' component={ LoadoutRouter } onFail={ onAuthFailure }  />
						<AuthenticatedRoute path='/events' component={ EventRouter } onFail={ onAuthFailure }  />
						<Redirect from='/' to='/armory' />
					</Switch>
				</div>
			</React.Fragment>
		</Router>
	)
}

export default Main
