const entities = require('./database/entities')
const baseEntity = require('./base-entity')

module.exports = {
	weapons: baseEntity(entities().weapon, 'weapon'),
	attachments: baseEntity(entities().attachment, 'attachment'),
	gear: baseEntity(entities().gear, 'gear')
}
