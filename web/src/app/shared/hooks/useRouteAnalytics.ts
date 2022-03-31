import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import useAnalytics from './useAnalytics'

export default function useRouteAnalytics(): void {
	const location = useLocation()
	const analytics = useAnalytics()

	useEffect(() => {
		if (location.pathname === '/') {
			return
		}

		const parts = location.pathname.split('/')

		// Helps grouping the events in firebase
		const prefix = 'view'

		// Logic is true for now!
		const pageTitle = `${parts[1]}_${parts.length > 2 ? 'details' : 'list'}`

		analytics.logEvent(`${prefix}_${pageTitle}`)
	}, [analytics, location])
}
