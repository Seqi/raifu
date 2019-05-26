import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Loading } from 'app/shared/components'
import auth from '../../../../firebase/auth'

const AUTH_TIMEOUT = 1000

function AuthenticatedRoute(props) {
	let [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		// Watch for user logging out
		let onAuthChangeSub = auth.onAuthChanged(user => user ? setIsAuthenticated(true) : props.onFail())

		// Give Firebase a sec to set user from token
		if (!auth.isAuthenticated) {
			setTimeout(() => !auth.isAuthenticated && props.onFail(), AUTH_TIMEOUT)
		}

		return onAuthChangeSub
	}, [])

	return isAuthenticated ? <Route { ...props } /> : <Loading />
}

AuthenticatedRoute.propTypes = {
	onFail: PropTypes.func.isRequired
}

export default withRouter(AuthenticatedRoute)