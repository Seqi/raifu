import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import EventList from './components/EventList'
import EventDetails from './components/Event/EventDetails'

const EventRouter: FC = () => {
	return (
		<Routes>
			<Route index={true} element={<EventList />} />
			<Route path=':id' element={<EventDetails />} />
		</Routes>
	)
}

export default EventRouter
