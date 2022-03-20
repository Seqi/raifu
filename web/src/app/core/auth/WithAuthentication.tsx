import { useEffect, useContext, useRef, FC, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { LoadingOverlay } from 'app/shared/state'
import { UserContext } from 'app/core/auth/contexts'

type WithAuthenticationOptions = {
	waitFor?: number
	children: React.ReactElement<any, any>
}

const WithAuthentication: FC<WithAuthenticationOptions> = ({ waitFor, children }) => {
	const user = useContext(UserContext)
	const [failed, setFailed] = useState<boolean>(false)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
		return <Navigate to={{ pathname: '/login' }} />
	}

	if (!user) {
		return <LoadingOverlay />
	}

	return children
}

WithAuthentication.propTypes = {
	waitFor: PropTypes.number,
}

WithAuthentication.defaultProps = {
	waitFor: 1000,
}

export default WithAuthentication
