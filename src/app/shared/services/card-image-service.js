let getWeaponImage = (type, platform) => {
	if (!type || !platform) {
		throw Error('A platform or name was not provided.')
	}

	let formattedPlatform = platform.toLowerCase()
		.replace(' ', '-')

	try {
		return require(`../../../assets/outlines/weapons/${type}/${formattedPlatform}.png`)
	} catch {
		return ''
	}
}

let getAttachmentImage = (name) => {
	if (!name) {
		throw Error('A name was not provided.')
	}

	let formattedName = name.toLowerCase()
		.replace(' ', '-')

	try {
		return require(`../../../assets/outlines/attachments/${formattedName}.png`)
	} catch {
		return ''
	}
}

export { getWeaponImage, getAttachmentImage }
