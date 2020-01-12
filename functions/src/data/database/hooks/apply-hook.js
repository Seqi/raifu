module.exports = function applyHook(mapFunction, recursive) {
	return (result) => {
		if (!result) {
			return 
		}
	
		let rows = result
	
		if (!Array.isArray(result)) {
			rows = [ result ]
		}
		
		rows.forEach((row) => {	
			// Apply hook to a plain copy of the row
			let json = row.toJSON()
			mapFunction(json)

			// Map the plain copy back into a full fat sequelize 'instance'
			row.set(json)
			
			if (recursive) {
				// Check if any children also need dates converting
				Object.keys(row)
					.filter(key => row[key] !== null && typeof row[key] === 'object')
					.forEach(key => applyHook(row[key], mapFunction))
			}
		})
	}	
}