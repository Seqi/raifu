function dateSortByKey(key) {
	return (item1, item2) => new Date(item1[key].createdAt) - new Date(item2[key].createdAt)
}

function setTimestamps(item, field) {
	item.createdAt = item[field].createdAt
	item.updatedAt = item[field].updatedAt
}

module.exports = function orderLoadoutItems(loadout) {
	if (!loadout) {
		return
	}

	loadout.weapons.sort(dateSortByKey('loadout_weapon'))
	loadout.weapons.forEach((weapon) => {
		setTimestamps(weapon, 'loadout_weapon')
	})

	if (loadout.gear) {
		loadout.gear.sort(dateSortByKey('loadout_gear'))
		loadout.gear.forEach((gear) => {
			setTimestamps(gear, 'loadout_gear')
		})

		loadout.gear.forEach((gear) => delete gear.loadout_gear)
	}

	if (loadout.clothing) {
		loadout.clothing.sort(dateSortByKey('loadout_clothing'))
		loadout.clothing.forEach((clothing) => {
			setTimestamps(clothing, 'loadout_clothing')
		})

		loadout.gear.forEach((gear) => delete gear.loadout_clothing)
	}

	loadout.weapons.forEach((weapon) => {
		delete weapon.loadout_weapon

		if (weapon.attachments) {
			weapon.attachments.sort(dateSortByKey('loadout_weapon_attachment'))
			weapon.attachents.forEach((attachment) => {
				setTimestamps(attachment, 'loadout_weapon_attachments')
			})

			weapon.attachments.forEach(
				(attachment) => delete attachment.loadout_weapon_attachment
			)
		}
	})
}
