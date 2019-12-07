import React, { useState, useEffect, useContext } from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Loading } from 'app/shared/components'
import { AuthContext } from 'app/core/auth/contexts'

const AUTH_TIMEOUT = 1000

function AuthenticatedRoute({ onFail, ...props }) {
	let auth = useContext(AuthContext)
	let [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated)

	useEffect(() => {
		// Watch for user logging out
		let onAuthChangeSub = auth.onAuthChanged(user => {
			user ? setIsAuthenticated(true) : onFail()
		})

		// Give Firebase a sec to set user from token
		if (!auth.isAuthenticated) {
			setTimeout(() => !auth.isAuthenticated && onFail(), AUTH_TIMEOUT)
		}

		return onAuthChangeSub
	}, [auth, onFail])

	return isAuthenticated ? <Route { ...props } /> : <Loading />
}

AuthenticatedRoute.propTypes = {
	onFail: PropTypes.func.isRequired
}

export default withRouter(AuthenticatedRoute)