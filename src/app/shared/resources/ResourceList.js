import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import CardList from 'app/shared/cards/CardList'

const ResourceList = ({
	showTitle,
	items,
	addResource,
	deleteResource,
	resourceType,
	onResourceClick,
	renderAddDialog
}) => {
	let [dialog, setDialog] = useState(null)

	return (
		<React.Fragment>
			{ showTitle && 
				<ReactiveTitle>
					{ /* eslint-disable-next-line newline-per-chained-call */ }
					{ resourceType.charAt(0).toUpperCase() + resourceType.slice(1) }
				</ReactiveTitle>
			}

			<CardList
				items={ items }
				cardType={ resourceType }
				onAdd={ () => setDialog('add') }
				onCardClick={ onResourceClick }
				onCardDelete={ deleteResource }
			/>						

			{ renderAddDialog(
				// Is Open
				dialog === 'add',
				// OnClose
				() => setDialog(null),
				// OnSave
				addResource
			)}
		</React.Fragment>
	)
}

ResourceList.propTypes = {
	showTitle: PropTypes.bool,
	resourceType: PropTypes.oneOf([
		'weapons', 'attachments', 'gear', 'clothing', 'loadout'
	]).isRequired,
	onResourceClick: PropTypes.func,
	renderAddDialog: PropTypes.func.isRequired,

	items: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	addResource: PropTypes.func.isRequired,
	deleteResource: PropTypes.func.isRequired,
}

ResourceList.defaultProps = {
	showTitle: true,
	onResourceClick: (id) => { }
}

export default ResourceList