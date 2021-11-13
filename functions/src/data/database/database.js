const { logger } = require('firebase-functions')
const { Sequelize } = require('sequelize')
const shortid = require('shortid')

const config = require('./config')

let database = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	dialect: 'postgres',
	dialectOptions: {
		useUTC: false,
	},
	logging: (msg) => logger.debug(msg),
})

// Adding hooks with this method adds permanent hooks, ensuring that
// these hooks are still run, even when other hooks are defined at
// the entitiy level
database.addHook('beforeCreate', (model) => (model.id = shortid.generate()))

module.exports = database
