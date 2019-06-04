const functions = require('firebase-functions')

module.exports = {
	https: {
		HttpsError: functions.https.HttpsError,
		onCall: functions.https.onCall,
		onAuthedCall: (callback) => {
			return functions.https.onCall((data, context) => {
				if (!context.auth || !context.auth.uid) {
					return new functions.https.HttpsError('unauthenticated')
				}

				return callback(data, context)
			})
		}
	}
}
