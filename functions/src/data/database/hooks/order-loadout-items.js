function dateSortByKey(key) {
	return (item1, item2) => new Date(item1.dataValues[key].createdAt) - new Date(item2.dataValues[key].createdAt)
}

module.exports = function orderLoadoutItems(loadout) {
	if (!loadout) {
		return 
	}

	console.log(loadout, '#######################################', loadout.dataValues)

	loadout.dataValues.weapons.sort(dateSortByKey('loadout_weapon'))

	if (loadout.dataValues.gear) {
		loadout.dataValues.gear.sort(dateSortByKey('loadout_gear'))	
		// loadout.gear.forEach(gear => delete gear.loadout_gear)
	}

	if (loadout.dataValues.clothing) {
		loadout.dataValues.clothing.sort(dateSortByKey('loadout_clothing'))	
		// loadout.gear.forEach(gear => delete gear.loadout_gear)
	}
	
	loadout.dataValues.weapons.forEach(weapon => {
		// delete weapon.loadout_weapon

		if (!weapon.dataValues.attachments) {
			return
		}

		weapon.dataValues.attachments.sort(dateSortByKey('loadout_weapon_attachment'))

		// weapon.attachments.forEach(attachment => delete attachment.loadout_weapon_attachment)
	})
}
