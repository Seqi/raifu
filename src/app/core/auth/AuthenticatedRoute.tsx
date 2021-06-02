import { useEffect, useContext, useRef, FC, useState } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import PropTypes from 'prop-types'

import { LoadingOverlay } from 'app/shared/state'
import { UserContext } from 'app/core/auth/contexts'

type AuthenticatedRouteProps = RouteProps & {
	waitFor?: number
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ waitFor, ...props }) => {
	let user = useContext(UserContext)
	let [failed, setFailed] = useState<boolean>(false)
	let timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		// If we don't have a user, wait to see the specified amount before throwing out
		if (!user) {
			timer.current = setTimeout(() => {
				setFailed(true)
			}, waitFor)
		}

		// Clear any existing timeout if rerendering
		return () => {
			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [user, waitFor])

	if (failed) {
		return <Redirect to={ { pathname: '/login' } } push={ true } />
	}

	if (!user) {
		return <LoadingOverlay />
	}

	return <Route { ...props } />
}

AuthenticatedRoute.propTypes = {
	waitFor: PropTypes.number,
}

AuthenticatedRoute.defaultProps = {
	waitFor: 1000,
}

export default AuthenticatedRoute
