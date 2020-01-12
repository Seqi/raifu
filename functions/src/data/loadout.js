const Op = require('sequelize').Op
const entities = require('./database/entities')
const baseEntity = require('./base-entity')
const errors = require('../utils/errors')

module.exports = {
	...baseEntity(entities().loadout, 'loadout'),
	getAll: async (user) => {
		try {
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
		} catch (e) {
			console.error(`Error retrieving loadouts for ${user.uid}`, e)
			throw e
		}
	},

	getById: async (id, user) => {
		if (!id) {
			console.warn(`No id was supplied for getting loadout by id for ${user ? user.uid : 'anonymous'}`)
			throw new errors.BadRequestError('Id is required')
		}

		try {
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
				console.warn(`No loadout was found with id ${id} for user ${user ? user.uid : 'anonymous'}`)
				throw new errors.NotFoundError()
			}

			return loadout.toJSON()
		} catch (e) {
			console.warn(`Error retrieving loadout for ${user ? user.uid : 'anonymous'}`, e)
			throw e
		}
	},
}
