let firebase = require('firebase-admin')

let middleware = (blockUnauthorised = true) => {
	return async (req, res, next) => {
		let authHeader = req.headers.authorization

		if (!authHeader) {
			if (!blockUnauthorised) {
				return next()
			}

			return res.status(401).end()
		}

		let authHeaderParts = authHeader.split(' ')

		if (authHeaderParts.length !== 2) {
			return res.status(401).end("Authorization header must be in 'Bearer [token]' format")
		}

		let scheme = authHeaderParts[0]
		let creds = authHeaderParts[1]

		if (!/^Bearer$/i.test(scheme)) {
			return res.status(401).end("Authorization header must be in 'Bearer [token]' format")
		}

		try {
			await firebase
				.auth()
				.verifyIdToken(creds)
				.then((user) => (req.user = user))

			next()
		} catch (e) {
			if (blockUnauthorised) {
				return res.status(403).end('Unauthorized')
			}
			next()
		}
	}
}

module.exports = middleware
