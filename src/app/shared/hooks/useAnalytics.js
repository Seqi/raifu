import app from '../../../firebase'

const analytics = app.analytics()

export default function useAnalytics () {
	return analytics
}