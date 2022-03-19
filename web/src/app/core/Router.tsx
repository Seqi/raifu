import { FC, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { LoadingOverlay } from 'app/shared/state'
import { SharedLoadout } from 'app/features/share'
import { UserContextProvider, AuthContextProvider } from './auth/contexts'

import App from './pages/App'
import HomePage from './pages/Home'
import WithAuthentication from './auth/WithAuthentication'

const AuthRouter = lazy(
	() => import(/* webpackChunkName: "auth" */ 'app/core/auth/AuthRouter')
)
const Armory = lazy(
	() => import(/* webpackChunkName: "armory" */ 'app/features/armory/components/Armory')
)
const LoadoutRouter = lazy(
	() => import(/* webpackChunkName: "loadout" */ 'app/features/loadouts/LoadoutRouter')
)
const EventRouter = lazy(
	() => import(/* webpackChunkName: "event" */ 'app/features/events/EventRouter')
)

let AppRouter: FC = () => {
	return (
		<Router>
			<AuthContextProvider>
				<UserContextProvider>
					<Routes>
						<Route path='/' element={<HomePage />} />

						<Route
							path='login'
							element={
								<Suspense fallback={<LoadingOverlay />}>
									<AuthRouter />
								</Suspense>
							}
						/>

						<Route
							path='app'
							element={
								<WithAuthentication>
									<App />
								</WithAuthentication>
							}
						>
							<Route index={true} element={<Navigate to='armory' />} />
							<Route
								path='armory'
								element={
									<Suspense fallback={<LoadingOverlay />}>
										<Armory />
									</Suspense>
								}
							/>
							<Route
								path='loadouts/*'
								element={
									<Suspense fallback={<LoadingOverlay />}>
										<LoadoutRouter />
									</Suspense>
								}
							/>
							<Route
								path='events/*'
								element={
									<Suspense fallback={<LoadingOverlay />}>
										<EventRouter />
									</Suspense>
								}
							/>
						</Route>

						<Route path='/share/loadout/:loadoutId' element={<SharedLoadout />} />
					</Routes>
				</UserContextProvider>
			</AuthContextProvider>
		</Router>
	)
}

export default AppRouter
