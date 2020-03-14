import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

function AppRouter() {
	return (
		<Router basename='app'>
			<App />
		</Router>
	)
}

export default AppRouter
