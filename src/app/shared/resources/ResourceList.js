import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Error, Loading } from 'app/shared'
import ReactiveTitle from 'app/shared/text/ReactiveTitle'
import CardList from 'app/shared/cards/CardList'

const ResourceList = ({
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
			<ReactiveTitle>
				{ /* eslint-disable-next-line newline-per-chained-call */ }
				{ resourceType.charAt(0).toUpper() + resourceType.slice(1) }
			</ReactiveTitle>
			{ 
				loading ? <Loading /> :
					error ? <Error error={ `An error occurred while loading ${resourceType}.` } onRetry={ loadResource } /> : 
						(
							<CardList
								items={ items }
								cardType={ resourceType }
								onAdd={ () => setDialog('add') }
								onCardClick={ onResourceClick }
								onCardDelete={ deleteResource }
							/>
						)
			}

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
	resourceType: PropTypes.oneOf([
		'weapons', 'attachments', 'gear', 'clothing', 'loadout'
	]).isRequired,
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