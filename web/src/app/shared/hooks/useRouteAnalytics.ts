import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import useAnalytics from './useAnalytics'

export default function useRouteAnalytics(): void {
	let location = useLocation()
	let analytics = useAnalytics()

	useEffect(() => {
		if (location.pathname === '/') {
			return
		}

		let parts = location.pathname.split('/')

		// Helps grouping the events in firebase
		let prefix = 'view'

		// Logic is true for now!
		let pageTitle = `${parts[1]}_${parts.length > 2 ? 'details' : 'list'}`

		analytics.logEvent(`${prefix}_${pageTitle}`)
	}, [analytics, location])
}
