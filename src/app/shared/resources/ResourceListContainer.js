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
			.then(() => mounted.current && setItems((items) => (items.filter((item) => item.id !== id) )))
	, [resource])

	return (
		<ResourceList
			items={ currentItems }
			addResource={ addResource }
			deleteResource={ deleteResource }
			{ ...props }
		/>
	)
}

ResourceListContainer.propTypes = {
	items: PropTypes.array.isRequired,
	resource: PropTypes.shape({
		add: PropTypes.func.isRequired,
		delete: PropTypes.func.isRequired,
	}).isRequired
}

export default ResourceListContainer