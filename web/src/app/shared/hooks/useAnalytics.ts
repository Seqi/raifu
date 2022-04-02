import app from '../../../firebase'
import firebase from 'firebase/app'
import { useRef } from 'react'

export default function useAnalytics(): firebase.analytics.Analytics {
	const analyticsRef = useRef<firebase.analytics.Analytics>(app.analytics())
	return analyticsRef.current
}
