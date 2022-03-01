import app from '../../../firebase'
import firebase from 'firebase/app'

const analytics = app.analytics()

export default function useAnalytics(): firebase.analytics.Analytics {
	return analytics
}
