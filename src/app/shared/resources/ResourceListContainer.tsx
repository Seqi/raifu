import { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ResourceList, ResourceListProps } from './ResourceList'
import useAnalytics from 'app/shared/hooks/useAnalytics'
import { Resource } from '../models/resource'

export type ResourceListContainerProps<R extends Resource> = Omit<
	ResourceListProps<R>,
	'addResource' | 'deleteResource'
> & {
	resource: any // TODO: Type
	resourceName: string
}

export const ResourceListContainer = <R extends Resource>({
	resource,
	resourceName,
	items,
	...props
}: ResourceListContainerProps<R>) => {
	let [currentItems, setItems] = useState<R[]>(items)
	let analytics = useAnalytics()

	// Listen out for component unmounting so we don't set state on a mounted component
	let mounted = useRef<boolean>(true)
	useEffect(() => {
		return () => {
			mounted.current = false
		}
	}, [])

	let addResource = useCallback(
		(item: R) =>
			resource
				.add(item)
				.then((result: R) => mounted.current && setItems((items) => [...items, result]))
				.then(() => analytics.logEvent(`${resourceName}_added`)),
		[analytics, resource, resourceName]
	)

	let deleteResource = useCallback(
		(deletedItem: R) =>
			resource
				.delete(deletedItem.id)
				.then(
					() =>
						mounted.current &&
						setItems((items) => items.filter((item) => item.id !== deletedItem.id))
				)
				.then(() => analytics.logEvent(`${resourceName}_added`)),
		[analytics, resource, resourceName]
	)

	return (
		<ResourceList
			{ ...props }
			items={ currentItems }
			addResource={ addResource }
			deleteResource={ deleteResource }
		/>
	)
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
