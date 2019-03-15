let getImage = (category, type, platform) => {
	if (!type || !platform) {
		throw Error('A platform or name was not provided.')
	}

	let formattedPlatform = platform
		.toLowerCase()
		.replace(/[.]/g, '')
		.replace(/\s/g, '-')

	try {
		return require(`../../../assets/outlines/${category}/${type}/${formattedPlatform}.png`)
	} catch (e) {
		console.log(e)
		return ''
	}
}

export { getImage }
