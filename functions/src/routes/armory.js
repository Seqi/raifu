let express = require('express')
let router = express.Router()

let baseEntity = require('../data/base-entity')
let entities = require('../data/database/entities')

router.get('/', async (req, res) => {
	try {
		let promises = [ 
			baseEntity(entities().weapon)
				.getAll(req.user),

			baseEntity(entities().attachment)
				.getAll(req.user),

			baseEntity(entities().gear)
				.getAll(req.user),

			baseEntity(entities().clothing)
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