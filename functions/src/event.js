const entities = require('./database/entities')
const baseEntity = require('./base-entity')

module.exports = {
	...baseEntity(entities().event, 'event')
}