const functions = require('firebase-functions')
const config = functions.config()

module.exports = {
	user: config.db.user,
	password: config.db.password,
	database: config.db.name,
	host: config.db.host
}
