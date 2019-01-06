let getImage = (category, type, platform) => {
	if (!category || !type || !platform) {
		throw Error('A type, platform or name was not provided.')
	}

	let formattedPlatform = platform.toLowerCase()
		.replace(' ', '-')

	try {
		return require(`../../../assets/outlines/${category}/${type}/${formattedPlatform}.png`)
	} catch {
		return ''
	}
}

export { getImage }
