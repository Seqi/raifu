import firebase from 'firebase/app'

import app from '../../../firebase'

const analytics = app.analytics()

export default function useAnalytics(): firebase.analytics.Analytics {
	return analytics
}
