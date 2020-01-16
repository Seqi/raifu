import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import CardList from 'app/shared/cards/CardList'

const ResourceList = ({
	title,
	items,
	addResource,
	deleteResource,
	cardType,
	onResourceClick,
	renderAddDialog
}) => {
	let [dialog, setDialog] = useState(null)

	return (
		<React.Fragment>
			{ title && 
				<ReactiveTitle>
					{ title }
				</ReactiveTitle>
			}

			<CardList
				items={ items }
				cardType={ cardType }
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
	title: PropTypes.string,
	cardType: PropTypes.elementType.isRequired,
	onResourceClick: PropTypes.func,
	renderAddDialog: PropTypes.func.isRequired,

	items: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	addResource: PropTypes.func.isRequired,
	deleteResource: PropTypes.func.isRequired,
}

ResourceList.defaultProps = {
	title: '',
	onResourceClick: (id) => { }
}

export default ResourceList