const Op = require('sequelize').Op

const errors = require('../utils/errors')
const baseEntity = require('./base-entity')
const { Loadout, Weapon, Gear, Attachment, Clothing } = require('./database/entities')

module.exports = {
	...baseEntity(Loadout),
	getAll: async (user) => {
		let loadouts = await Loadout.findAll({
			where: {
				uid: user.uid
			},
			include: [
				{
					model: Weapon,
					attributes: {
						exclude: ['uid']
					}
				},					
				{
					model: Gear,
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

		let loadout = await Loadout.findOne({
			where: {
				id: id,
				...query
			},
			include: [
				{
					model: Weapon,
					attributes: {
						exclude: ['uid']
					},
					include: [ {
						model: Attachment,
						through: {
							where: {
								loadout_id: id
							}
						}
					}],
				},
				{
					model: Gear,
					as: 'gear',
					attributes: {
						exclude: ['uid']
					}
				},
				{
					model: Clothing,
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

	edit: async (id, data, user) => {
		try {
			// Ensure this id exists and belongs to the user
			let exists = (await Loadout.count({
				where: {
					id: id,
					uid: user.uid
				}
			})) === 1

			if (!exists) {
				throw new errors.NotFoundError()
			}

			let updateFields = {
				name: data.name
			}

			let [rowsUpdated, [newLoadout]] = await Loadout.update(updateFields, {
				where: {
					id: id,
					uid: user.uid
				},
				returning: true,
			})

			if (rowsUpdated === 0) {
				throw new Error('No rows affected')
			}

			return newLoadout
		} catch (e) {
			// Validation errors are contained in an array, so pick them out
			let message = e.errors && e.errors.map((error) => error.message)

			if (message) {
				throw new errors.BadRequestError(message)
			} else {
				throw e
			}
		}
	},

	share: async (id, isShared, user) => {
		// Ensure this id exists and belongs to the user
		let exists = (await Loadout.count({
			where: {
				id: id,
				uid: user.uid
			}
		})) === 1

		if (!exists) {
			throw new errors.NotFoundError()
		}

		return await Loadout.update({ shared: isShared }, {
			where: {
				id: id,
				uid: user.uid
			}
		})
	},
}
