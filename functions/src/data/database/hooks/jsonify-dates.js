// Firebase functions don't serialize js date objects, so we
// need to JSONify them before sending them down
let jsonifyDates = (row) => {
	console.log('jsonifying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
	if (row.createdAt) {
		row.createdAt = row.createdAt.toJSON()
	}
		
	if (row.updatedAt) {
		row.updatedAt = row.updatedAt.toJSON()
	}
}

module.exports = jsonifyDates