import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'
import useAnalytics from 'app/shared/hooks/useAnalytics'

const ResourceListContainer = ({ resource, resourceName, items, ...props }) => {
	let [currentItems, setItems] = useState(items)
	let analytics = useAnalytics()

	// Listen out for component unmounting so we don't set state on a mounted component
	let mounted = useRef(true)
	useEffect(() => () => (mounted.current = false), [])

	let addResource = useCallback(
		(item) =>
			resource
				.add(item)
				.then((result) => mounted.current && setItems((items) => [...items, result]))
				.then(() => analytics.logEvent(`${resourceName}_added`)),
		[analytics, resource, resourceName]
	)

	let deleteResource = useCallback(
		(id) =>
			resource
				.delete(id)
				.then(() => mounted.current && setItems((items) => items.filter((item) => item.id !== id)))
				.then(() => analytics.logEvent(`${resourceName}_added`)),
		[analytics, resource, resourceName]
	)

	return <ResourceList items={currentItems} addResource={addResource} deleteResource={deleteResource} {...props} />
}

ResourceListContainer.propTypes = {
	items: PropTypes.array.isRequired,
	resource: PropTypes.shape({
		add: PropTypes.func.isRequired,
		delete: PropTypes.func.isRequired,
	}).isRequired,
	resourceName: PropTypes.string.isRequired,
}

export default ResourceListContainer
