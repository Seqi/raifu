import { FC } from 'react'
import {  Route, Routes } from 'react-router-dom'

import LoadoutList from './components/LoadoutList/LoadoutList'
import LoadoutPage from './components/LoadoutPage/LoadoutPage'

const LoadoutRouter: FC = () => (
	<Routes>
		<Route index={ true } element={ <LoadoutList/> } />
		<Route path=':id' element={ <LoadoutPage/> } />
	</Routes>
)

export default LoadoutRouter
