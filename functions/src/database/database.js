const Sequelize = require('sequelize')
const config = require('./config')
const jsonifyDates = require('./jsonify-dates')

let sequelize

module.exports = () => {
	if (!sequelize) {
		sequelize = new Sequelize(config.database, config.user, config.password, {
			host: config.host,
			dialect: 'postgres',
			define: {
				hooks: {
					// Firebase functions don't serialize js date objects, so we
					// need to JSONify them before sending them down
					afterCreate: jsonifyDates,
					afterUpdate: jsonifyDates,
					afterFind: jsonifyDates
				}
			}
		})
	}

	return sequelize
}
