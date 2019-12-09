import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'

const ResourceListContainer = ({ resource, ...props }) => {
	let [{ loading, error, items }, setItems] = useState({ loading: true, error: false, items: [] })
		
	// Listen out for component unmounting so we don't set state on a mounted component
	let mounted = useRef(true)
	useEffect(() => () => mounted.current = false, [])

	let loadResource = useCallback(() => {
		setItems(({ loading, error, items }) => ({ loading: true, error, items}))

		resource.get()
			.then((result) => mounted.current && setItems({ loading: false, error: false, items: result }))
			.catch(() => mounted.current && setItems({ loading: false, error: true, items: [] }))
	}, [resource])

	let addResource = useCallback((item) => 
		resource.add(item)
			.then((result) => setItems(({ loading, error, items}) => ({ loading, error, items: [ items, result ]})))
	, [resource])

	let deleteResource = useCallback((id) => 
		resource.delete(id)
			// Filter out deleted item
			.then(() => mounted.current && setItems(({ items }) => 
				({ loading: false, error: false, items: items.filter((item) => item.id !== id) }))
			)
	, [resource])

	// Initialise with a load
	useEffect(loadResource, [resource])

	return (
		<ResourceList
			{ ...props }
			items={ items }
			loading={ loading }
			error={ error }
			loadResource={ loadResource }
			addResource={ addResource }
			deleteResource={ deleteResource }
		/>
	)
}

ResourceListContainer.propTypes = {
	resource: PropTypes.shape({
		get: PropTypes.func.isRequired,
		add: PropTypes.func.isRequired,
		delete: PropTypes.func.isRequired,
	}).isRequired
}

export default ResourceListContainer