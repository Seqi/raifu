import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'

const ResourceListContainer = ({ resource, items, ...props }) => {
	let [currentItems, setItems] = useState(items)
		
	// Listen out for component unmounting so we don't set state on a mounted component
	let mounted = useRef(true)
	useEffect(() => () => mounted.current = false, [])

	let addResource = useCallback((item) => 
		resource.add(item)
			.then((result) => mounted.current && setItems((items) => [ ...items, result ]))
	, [resource])

	let deleteResource = useCallback((id) => 
		resource.delete(id)
			// Filter out deleted item
			.then(() => mounted.current && setItems(({ items }) => 
				({ loading: false, error: false, items: items.filter((item) => item.id !== id) }))
			)
	, [resource])

	return (
		<ResourceList
			{ ...props }
			items={ currentItems }
			loading={ false }
			error={ false }
			addResource={ addResource }
			deleteResource={ deleteResource }
		/>
	)
}

ResourceListContainer.propTypes = {
	items: PropTypes.array.isRequired,
	resource: PropTypes.shape({
		get: PropTypes.func.isRequired,
		add: PropTypes.func.isRequired,
		delete: PropTypes.func.isRequired,
	}).isRequired
}

export default ResourceListContainer