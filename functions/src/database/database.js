const Sequelize = require('sequelize')
const config = require('./config')

let sequelize

module.exports = () => {
	if (!sequelize) {
		sequelize = new Sequelize(config.database, config.user, config.password, {
			host: config.host,
			dialect: 'postgres'
		})
	}

	return sequelize
}
