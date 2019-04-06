const functions = require('firebase-functions')
const config = functions.config()

module.exports = {
	user: config.db && config.db.user,
	password: config.db && config.db.password,
	database: config.db && config.db.name,
	host: config.db && config.db.host
}
