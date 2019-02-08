function convertCamelCaseToLabel(word) {
	let pascal = word.charAt(0)
		.toUpperCase() + word.substring(1)

	let words = pascal.match(/[A-Z][a-z]*/g)

	return words.join(' ')
}

function convertToSingular(word) {
	let lastLetter = word.charAt(word.length - 1)

	if (lastLetter === 's') {
		return word.substring(0, word.length - 1)
	} else {
		return word
	}
}

export { convertCamelCaseToLabel, convertToSingular }
