import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Error, Loading } from 'app/shared/components'
import ReactiveTitle from 'app/shared/components/Text/ReactiveTitle'
import CardList from 'app/shared/components/Cards/CardList'

const ResourceList = ({ 
	title, 
	items,
	loading,
	error,
	loadResource,
	addResource,
	deleteResource,
	resourceType,
	onResourceClick,
	renderAddDialog
}) => {
	let [dialog, setDialog] = useState(null)

	return (
		<React.Fragment>
			<ReactiveTitle>{ title }</ReactiveTitle>
			{loading ? (
				<Loading />
			) : error ? (
				<Error error='could not load' onRetry={ loadResource } />
			) : (
				<CardList
					items={ items }
					cardType={ resourceType }
					onAdd={ () => setDialog('add') }
					onCardClick={ onResourceClick }
					onCardDelete={ deleteResource }
				/>
			)}

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
	title: PropTypes.string.isRequired,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'loadout']).isRequired,
	onResourceClick: PropTypes.func,
	renderAddDialog: PropTypes.func.isRequired,

	items: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	loadResource: PropTypes.func.isRequired,
	addResource: PropTypes.func.isRequired,
	deleteResource: PropTypes.func.isRequired,
}

ResourceList.defaultProps = {
	onResourceClick: (id) => { }
}

export default ResourceList