import { FC, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { UserContextProvider, AuthContextProvider } from './auth/contexts'
import AuthPage from './auth/components/AuthPage'

import App from './pages/App'
import HomePage from './pages/Home'
import { LoadingOverlay } from 'app/shared/state'
import WithAuthentication from './auth/WithAuthentication'
import SignupCard from './auth/components/SignupCard/SignupCard'
import LoginCard from './auth/components/LoginCard/LoginCard'
import { SharedLoadout } from 'app/features/share'

const Armory = lazy(() => import('app/features/armory/components/Armory'))
const LoadoutRouter = lazy(() => import('app/features/loadouts/LoadoutRouter'))
const EventRouter = lazy(() => import('app/features/events/EventRouter'))

let AppRouter: FC = () => {
	return (
		<Router>
			<AuthContextProvider>
				<UserContextProvider>
					<Routes>
						<Route path='/' element={<HomePage />} />

						<Route path='login' element={<AuthPage />}>
							<Route index={true} element={<LoginCard />} />
							<Route path='signup' element={<SignupCard />} />
						</Route>

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
