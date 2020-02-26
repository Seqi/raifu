import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CardList from 'app/shared/cards/CardList'

const ResourceList = ({
	items,
	addResource,
	deleteResource,
	resourceType,
	onResourceClick,
	addDialog
}) => {
	let [dialog, setDialog] = useState(null)

	return (
		<React.Fragment>
			<CardList
				items={ items }
				cardType={ resourceType }
				onAdd={ () => setDialog('add') }
				onCardClick={ onResourceClick }
				onCardDelete={ deleteResource }
				fullWidth={ resourceType === 'loadout' }
			/>						

			{ React.createElement(addDialog, {
				// Is Open
				isOpen: dialog === 'add',
				// OnClose
				onClose: () => setDialog(null),
				// OnSave
				onSave: addResource
			}) }
		</React.Fragment>
	)
}

ResourceList.propTypes = {
	resourceType: PropTypes.oneOf([
		'weapons', 'attachments', 'gear', 'clothing', 'loadout'
	]).isRequired,
	onResourceClick: PropTypes.func,
	addDialog: PropTypes.func.isRequired,

	items: PropTypes.array.isRequired,
	addResource: PropTypes.func.isRequired,
	deleteResource: PropTypes.func.isRequired,
}

ResourceList.defaultProps = {
	onResourceClick: (id) => { }
}

export default ResourceList