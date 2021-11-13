let { logger } = require('firebase-functions')
let express = require('express')
let router = express.Router()

let baseEntity = require('../data/base-entity')
let { Weapon, Attachment, Gear, Clothing } = require('../data/database/entities')

router.get('/', async (req, res, next) => {
	try {
		logger.info('Retrieving armory.', { userId: req.user.uid })

		let [weapons, attachments, gear, clothing] = await Promise.all(
			[Weapon, Attachment, Gear, Clothing].map((entity) =>
				baseEntity(entity)
					.getAll(req.user)
			)
		)

		logger.info(
			'Retrieved ' +
				`${weapons.length} weapons, ` +
				`${attachments.length} attachments ` +
				`${gear.length} gear ` +
				`${clothing.length} clothing`,
			{
				userId: req.user.uid,
				event: 'ARMORY_LOADED',
				itemCount: weapons.length + attachments.length + gear.length + clothing.length,
			}
		)

		return res.json({
			weapons,
			attachments,
			gear,
			clothing,
		})
	} catch (e) {
		logger.error('Error retrieving armory.', { userId: req.user.uid })
		next(e)
	}
})

module.exports = router
