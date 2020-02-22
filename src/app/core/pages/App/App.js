import React, { lazy, Suspense, useState, useCallback } from 'react'
import { BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom'

import { Box, Container, Tabs, Tab, useMediaQuery, useTheme } from '@material-ui/core'

import LoadingOverlay from 'app/shared/LoadingOverlay'
import AuthenticatedRoute from 'app/shared/auth/AuthenticatedRoute'

const Armory = lazy(() => import('app/features/armory'))
const LoadoutRouter = lazy(() => import('app/features/loadouts/LoadoutRouter'))
const EventRouter = lazy(() => import('app/features/events/EventRouter'))

let App = ({ location, history }) => {
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

	let theme = useTheme()
	let isMobile = useMediaQuery(theme.breakpoints.down('xs'))

	return (
		<Router basename='/app'>
			<React.Fragment>				
				<Container disableGutters={ isMobile } maxWidth={ false }>
					<Tabs width='100%' variant='fullWidth' centered={ true } value={ tabIndex } onChange={ (evt, idx) => setTabIndex(idx) }>
						<Tab label='Armory' component={ Link } to='/armory' />
						<Tab label='Loadouts' component={ Link } to='/loadouts' />
						<Tab label='Events' component={ Link } to='/events' />
					</Tabs>
				</Container>

				<Container maxWidth={ false }>
					<Box pt={ 2 }>
						<Suspense fallback={ <LoadingOverlay /> }>
							<Switch>
								<AuthenticatedRoute path='/armory' component={ Armory } onFail={ onAuthFailure } />
								<AuthenticatedRoute path='/loadouts' component={ LoadoutRouter } onFail={ onAuthFailure }  />
								<AuthenticatedRoute path='/events' component={ EventRouter } onFail={ onAuthFailure }  />
								<Redirect from='/' to='/armory' />
							</Switch>
						</Suspense>
					</Box>
				</Container>
			</React.Fragment>
		</Router>
	)
}

export default App
