const functions = require('firebase-functions')
const config = functions.config()

if (!config.db) {
	throw new Error(
		`No database configuration was found. Ensure that you created a .runtimeconfig.json file that contains your database configuration such as: ${JSON.stringify(
			{
				db: {
					user: 'myuser',
					password: 'password',
					name: 'dbname',
					host: 'dbhost',
				},
			},
			null,
			4
		)}`
	)
}

module.exports = {
	user: config.db.user,
	password: config.db.password,
	database: config.db.name,
	host: config.db.host,
}
