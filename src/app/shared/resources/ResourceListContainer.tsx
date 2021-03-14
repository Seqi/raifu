import { useRef, useState, useEffect, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import ResourceList, { ResourceListProps } from './ResourceList'
import useAnalytics from 'app/shared/hooks/useAnalytics'
import { Resource } from '../models/resource'

export type ResourceListContainerProps = Omit<
	ResourceListProps,
	'addResource' | 'deleteResource'
> & {
	resource: any // TODO: Type
	resourceName: string
}

export const ResourceListContainer: FC<ResourceListContainerProps> = ({
	resource,
	resourceName,
	items,
	...props
}) => {
	let [currentItems, setItems] = useState(items)
	let analytics = useAnalytics()

	// Listen out for component unmounting so we don't set state on a mounted component
	let mounted = useRef<boolean>(true)
	useEffect(() => {
		return () => {
			mounted.current = false
		}
	}, [])

	let addResource = useCallback(
		(item: Resource) =>
			resource
				.add(item)
				.then(
					(result: Resource) => mounted.current && setItems((items) => [...items, result])
				)
				.then(() => analytics.logEvent(`${resourceName}_added`)),
		[analytics, resource, resourceName]
	)

	let deleteResource = useCallback(
		(id) =>
			resource
				.delete(id)
				.then(
					() =>
						mounted.current && setItems((items) => items.filter((item) => item.id !== id))
				)
				.then(() => analytics.logEvent(`${resourceName}_added`)),
		[analytics, resource, resourceName]
	)

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
	}).isRequired,
	resourceName: PropTypes.string.isRequired,
}

export default ResourceListContainer
