const Sequelize = require('sequelize')
const shortid = require('shortid')

const config = require('./config')

let sequelize

module.exports = () => {
	if (!sequelize) {
		sequelize = new Sequelize(config.database, config.user, config.password, {
			host: config.host,
			dialect: 'postgres',
			dialectOptions: {
				useUTC: false
			}
		})

		// Adding hooks with this method adds permanent hooks, ensuring that
		// these hooks are still run, even when other hooks are defined at
		// the entitiy level
		sequelize.addHook('beforeCreate', model => model.id = shortid.generate())
	}

	return sequelize
}
