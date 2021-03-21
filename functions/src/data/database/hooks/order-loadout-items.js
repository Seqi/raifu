function dateSortByKey(key) {
	return (item1, item2) => new Date(item1[key].createdAt) - new Date(item2[key].createdAt)
}

module.exports = function orderLoadoutItems(loadout) {
	if (!loadout) {
		return
	}

	loadout.weapons.sort(dateSortByKey('loadout_weapon'))

	if (loadout.gear) {
		loadout.gear.sort(dateSortByKey('loadout_gear'))

		loadout.gear.forEach((gear) => delete gear.loadout_gear)
	}

	if (loadout.clothing) {
		loadout.clothing.sort(dateSortByKey('loadout_clothing'))
		loadout.clothing.forEach((clothing) => delete clothing.loadout_clothing)
	}

	loadout.weapons.forEach((weapon) => {
		delete weapon.loadout_weapon

		if (weapon.attachments) {
			weapon.attachments.sort(dateSortByKey('loadout_weapon_attachment'))
			weapon.attachments.forEach(
				(attachment) => delete attachment.loadout_weapon_attachment
			)
		}
	})
}
