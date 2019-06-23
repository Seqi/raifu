const Sequelize = require('sequelize')
const shortid = require('shortid')

const config = require('./config')
const jsonifyDates = require('./jsonify-dates')

let sequelize

module.exports = () => {
	if (!sequelize) {
		sequelize = new Sequelize(config.database, config.user, config.password, {
			host: config.host,
			dialect: 'postgres',
			dialectOptions: {
				useUTC: false
			},
			define: {
				hooks: {
					beforeCreate: (model) => {
						model.id = shortid.generate()
					},
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
