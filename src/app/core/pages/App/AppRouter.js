import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

function AppRouter(props) {
	return (
		<Router basename='app'>
			<App {...props} />
		</Router>
	)
}

export default AppRouter
