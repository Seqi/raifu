import { lazy, Suspense, useState, useCallback, FC } from 'react'
import { Link, Switch, Redirect, RouteChildrenProps } from 'react-router-dom'
import { Box, Container, Tabs, Tab, styled } from '@material-ui/core'

import useRouteAnalytics from 'app/shared/hooks/useRouteAnalytics'
import LoadingOverlay from 'app/shared/state/loading/LoadingOverlay'
import AuthenticatedRoute from '../../auth/AuthenticatedRoute'
import Navbar from 'app/core/layout/Navbar/Navbar'

const ArmoryRouter = lazy(() => import('app/features/armory/ArmoryRouter'))
const LoadoutRouter = lazy(() => import('app/features/loadouts/LoadoutRouter'))
const EventRouter = lazy(() => import('app/features/events/EventRouter'))

let PaddedContainer = styled(Container)(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		padding: theme.spacing(0, 5),
	},
}))

type AppProps = RouteChildrenProps

const App: FC<AppProps> = ({ history, location }) => {
	useRouteAnalytics()

	let [tabIndex, setTabIndex] = useState<number>(() => {
		let idxMap: { [key: string]: number } = {
			armory: 0,
			loadouts: 1,
			events: 2,
		}

		let currPath = location.pathname.split('/')[1]

		return idxMap[currPath] || 0
	})

	let onAuthFailure = useCallback(() => history.push('/login'), [history])

	return (
		<PaddedContainer maxWidth={ false }>
			<Navbar logoProps={ { maxWidth: '200px' } } />

			<Tabs
				variant='fullWidth'
				centered={ true }
				value={ tabIndex }
				onChange={ (evt, idx) => setTabIndex(idx) }
			>
				<Tab label='Armory' component={ Link } to='/armory' />
				<Tab label='Loadouts' component={ Link } to='/loadouts' />
				<Tab label='Events' component={ Link } to='/events' />
			</Tabs>

			{/* TODO: Basename for router to /app? */}
			<Box paddingY={ 2 }>
				<Suspense fallback={ <LoadingOverlay /> }>
					<Switch>
						<AuthenticatedRoute
							path='/armory'
							component={ ArmoryRouter }
							onFail={ onAuthFailure }
						/>
						<AuthenticatedRoute
							path='/loadouts'
							component={ LoadoutRouter }
							onFail={ onAuthFailure }
						/>
						<AuthenticatedRoute
							path='/events'
							component={ EventRouter }
							onFail={ onAuthFailure }
						/>
						<Redirect from='/' to='/armory' />
					</Switch>
				</Suspense>
			</Box>
		</PaddedContainer>
	)
}

export default App
