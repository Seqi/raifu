import React, { useEffect, useContext, useRef } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Loading } from 'app/shared'
import { UserContext } from 'app/core/auth/contexts'

function AuthenticatedRoute({ onFail, waitFor, ...props }) {
	let user = useContext(UserContext)
	let timer = useRef(null)

	useEffect(() => {		
		// If we don't have a user, wait to see the specified amount before throwing out
		if (!user) {			
			timer.current = setTimeout(() => {
				onFail()
			}, waitFor)
		}

		// Clear any existing timeout if rerendering
		return () => clearTimeout(timer.current)
	}, [onFail, user, waitFor])

	if (!user) {
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

export default AuthenticatedRoute