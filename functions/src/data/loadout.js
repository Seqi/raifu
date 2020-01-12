const Op = require('sequelize').Op
const entities = require('./database/entities')
const baseEntity = require('./base-entity')
const errors = require('../utils/errors')

module.exports = {
	...baseEntity(entities().loadout),
	getAll: async (user) => {
		let loadouts = await entities().loadout.findAll({
			where: {
				uid: user.uid
			},
			include: [
				{
					model: entities().weapon,
					attributes: {
						exclude: ['uid']
					}
				},					
				{
					model: entities().gear,
					as: 'gear',
					attributes: {
						exclude: ['uid']
					}
				}
			],
			attributes: {
				exclude: ['uid']
			},
			order: [
				'createdAt',
			]
		})

		return loadouts.map(loadout => loadout.toJSON())
	},

	getById: async (id, user) => {
		let query = user ? 
			{ [Op.or]: { uid: user.uid, shared: true } } :
			{ shared: true }

		let loadout = await entities().loadout.findOne({
			where: {
				id: id,
				...query
			},
			include: [
				{
					model: entities().weapon,
					attributes: {
						exclude: ['uid']
					},
					include: [ entities().attachment ],
				},
				{
					model: entities().gear,
					as: 'gear',
					attributes: {
						exclude: ['uid']
					}
				},
				{
					model: entities().clothing,
					as: 'clothing',
					attributes: {
						exclude: ['uid']
					}
				}
			],
			attributes: {
				exclude: ['uid']
			}
		})

		if (!loadout) {
			throw new errors.NotFoundError()
		}

		return loadout.toJSON()
	},
}
