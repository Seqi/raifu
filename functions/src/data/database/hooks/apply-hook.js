module.exports = function applyHook(mapFunction, recursive) {
	return (rows) => {
		if (!rows) {
			return
		}

		if (!Array.isArray(rows)) {
			rows = [rows]
		}

		rows.forEach((row) => {
			const copy = row.toJSON()
			mapFunction(copy)

			row.set(copy, { raw: true })
		})
	}
}
