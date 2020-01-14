let express = require('express')
let router = express.Router()

let baseEntity = require('../data/base-entity')
let { Weapon, Attachment, Gear, Clothing } = require('../data/database/entities')

router.get('/', async (req, res) => {
	try {
		let promises = [ 
			baseEntity(Weapon)
				.getAll(req.user),

			baseEntity(Attachment)
				.getAll(req.user),

			baseEntity(Gear)
				.getAll(req.user),

			baseEntity(Clothing)
				.getAll(req.user)
		]

		let [weapons, attachments, gear, clothing] = await Promise.all(promises)
		
		console.log(`[${req.user.uid}]: Retrieved ` +
			`${weapons.length} weapons, ` +
			`${attachments.length} attachments ` +
			`${gear.length} gear ` +
			`${clothing.length} clothing`)

		return res.json({
			weapons,
			attachments,
			gear,
			clothing
		})
	} 
	catch (e) {
		console.error(`[${req.user.uid}]: Error retrieving armory`, e)
		res.status(500)
			.end()
	}
})

module.exports = router