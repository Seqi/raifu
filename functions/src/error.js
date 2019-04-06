const functions = require('./firebase-functions-extensions')

module.exports = (httpError, exception, message) => {
	console.warn(message, (exception && exception.message) || '')
	return new functions.https.HttpsError(httpError, message, message)
}
