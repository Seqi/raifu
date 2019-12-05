import React, { useState, useEffect, useContext, useRef } from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Loading } from 'app/shared/components'
import UserContext from 'app/core/auth/UserContext'

function AuthenticatedRoute({ onFail, waitFor, ...props }) {
	let [isAuthenticated, setIsAuthenticated] = useState(false)
	let timer = useRef(null)
	let user = useContext(UserContext)

	useEffect(() => {
		// Clear any existing timeout
		clearTimeout(timer.current)

		// If we don't have a user, wait to see the specified amount before throwing out
		if (!user) {			
			timer.current = setTimeout(() => {
				setIsAuthenticated(false)
				onFail()
			}, waitFor)
		} else {
			setIsAuthenticated(true)
		}
	}, [onFail, waitFor, user])

	if (!isAuthenticated) {
		return <Loading />
	}

	return <Route { ...props } />
}

AuthenticatedRoute.propTypes = {
	waitFor: PropTypes.number,
	onFail: PropTypes.func.isRequired
}

AuthenticatedRoute.defaultProps = {
	waitFor: 1000
}

export default withRouter(AuthenticatedRoute)