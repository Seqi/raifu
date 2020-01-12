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
			mapObjectToSequelize(json, row)
			
			if (recursive) {
				// Check if any children also need dates converting
				Object.keys(row)
					.filter(key => row[key] !== null && typeof row[key] === 'object')
					.forEach(key => applyHook(row[key], mapFunction))
			}
		})
	}	
}

// Take a plain javascript object and map any changes back onto the corresponding
// sequelize instance that said object was created from (using .toJSON()). Think of this
// as the opposite, as if doing
// let obj = row.toJSON()
// let row = obj.toSequelize()
function mapObjectToSequelize(obj, sObj) {
	Object.keys(obj)
		.forEach(key => {
			// Get the plain property and the sequelize equivalent
			let prop = obj[key]
			let sProp = sObj.dataValues[key]

			// If the property is an array, force the sequelize array to match the 
			// order of the plain array, then map as per usual
			if (Array.isArray(prop)) {
				let sArray = prop.map(item => {
					let sItem = sProp.find(s => s.dataValues.id === item.id)
					
					mapObjectToSequelize(item, sItem)

					return sItem
				})

				sObj.dataValues[key] = sArray
			}

			// If it's an object, map
			else if (typeof prop === 'object' && prop !== null) {
				mapObjectToSequelize(prop, sProp)
			}

			else {
				sObj.dataValues[key] = prop
			}
		})
}