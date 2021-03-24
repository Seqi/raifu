import { useEffect, useContext, useRef, FC } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import PropTypes from 'prop-types'

import { LoadingOverlay } from 'app/shared/state'
import { UserContext } from 'app/core/auth/contexts'

type AuthenticatedRouteProps = RouteProps & {
	onFail: () => any
	waitFor?: number
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
	onFail,
	waitFor,
	...props
}) => {
	let user = useContext(UserContext)
	let timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		// If we don't have a user, wait to see the specified amount before throwing out
		if (!user) {
			timer.current = setTimeout(() => {
				onFail()
			}, waitFor)
		}

		// Clear any existing timeout if rerendering
		return () => {
			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [onFail, user, waitFor])

	if (!user) {
		return <LoadingOverlay />
	}

	return <Route { ...props } />
}

AuthenticatedRoute.propTypes = {
	waitFor: PropTypes.number,
	onFail: PropTypes.func.isRequired,
}

AuthenticatedRoute.defaultProps = {
	waitFor: 1000,
}

export default AuthenticatedRoute
