const Op = require('sequelize').Op
const entities = require('./database/entities')
const baseEntity = require('./base-entity')
const errors = require('../utils/errors')

let orderLoadoutItems = (loadout) => {
	if (!loadout) {
		return 
	}

	loadout.weapons.sort((weapon1, weapon2) => {
		let a1 = weapon1.loadout_weapon
		let a2 = weapon2.loadout_weapon

		return new Date(a1.createdAt) - new Date(a2.createdAt)
	})

	if (loadout.gear) {
		loadout.gear.sort((gear1, gear2) => {
			let a1 = gear1.loadout_gear
			let a2 = gear2.loadout_gear
	
			return new Date(a1.createdAt) - new Date(a2.createdAt)
		})
	
		loadout.gear.forEach(gear => delete gear.loadout_gear)
	}
	
	loadout.weapons.forEach(weapon => {
		delete weapon.loadout_weapon

		if (!weapon.attachments) {
			return
		}

		weapon.attachments.sort((attachment1, attachment2) => {
			let a1 = attachment1.loadout_weapon_attachment
			let a2 = attachment2.loadout_weapon_attachment
	
			return new Date(a1.createdAt) - new Date(a2.createdAt)
		})

		weapon.attachments.forEach(attachment => delete attachment.loadout_weapon_attachment)
	})
}

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
				order: ['createdAt']
			})

			// Hacky way to get the raw, nested data
			// Can't figure out how to get sequelize to do this!
			// raw=true doesnt work
			let result = JSON.parse(JSON.stringify(loadouts))			
			console.log('Successfuly retrieved loadouts', JSON.stringify(result))

			// Order each loadout weapon collection by when it was added then clean up unnecessary prop
			result.forEach(orderLoadoutItems)

			return result
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

			orderLoadoutItems(loadout)

			console.log('Successfuly retrieved loadout', loadout.id)

			return loadout.toJSON()
		} catch (e) {
			console.warn(`Error retrieving loadout for ${user ? user.uid : 'anonymous'}`, e)
			throw e
		}
	},

	orderLoadoutItems: orderLoadoutItems
}
