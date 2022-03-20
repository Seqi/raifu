import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthPage from './components/AuthPage'
import LoginCard from './components/LoginCard/LoginCard'
import SignupCard from './components/SignupCard/SignupCard'

const AuthRouter: FC = () => (
	<Routes>
		<Route path='/' element={<AuthPage />}>
			<Route index={true} element={<LoginCard />} />
			<Route path='signup' element={<SignupCard />} />
		</Route>
	</Routes>
)

export const p = 1

export default AuthRouter
