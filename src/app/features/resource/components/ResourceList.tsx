import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Grid, Fade } from '@material-ui/core'

import StaggeredAnimation from 'app/shared/animations/StaggeredAnimation'
import AddButton from 'app/shared/actions/add/AddButton'
import { Resource } from '../models/resource'

export type AddResourceDialogProps<ResourceItem extends Resource = Resource> = {
	isOpen: boolean
	onClose: () => void
	onSave: (resource: ResourceItem) => Promise<any>
}

export type ResourceItemProps<ResourceItem extends Resource = Resource> = {
	item: ResourceItem
	onClick: () => void
	onDelete: () => Promise<void>
}

export type ResourceListProps<ResourceItem extends Resource = Resource> = {
	items: ResourceItem[]
	fullWidth?: boolean
	renderAddDialog: (props: AddResourceDialogProps<ResourceItem>) => React.ReactNode

	// Events
	onResourceClick: (item: ResourceItem) => any
	addResource: (resource: ResourceItem) => Promise<any>
	deleteResource: (item: ResourceItem) => Promise<any>

	// Define how a single resource item looks
	ItemTemplate: React.ComponentType<ResourceItemProps<ResourceItem>>

	// Define how the add button looks
	AddButtonTemplate: React.ComponentType<any>
}

export const ResourceList = <R extends Resource = Resource>({
	renderAddDialog,
	items,
	ItemTemplate,
	AddButtonTemplate,
	onResourceClick,
	addResource,
	deleteResource,
	fullWidth,
}: ResourceListProps<R>) => {
	let [dialog, setDialog] = useState<'add' | null>(null)

	return (
		<React.Fragment>
			<Grid container={ true } spacing={ 2 }>
				<StaggeredAnimation maxDuration={ 250 }>
					{items.map((item) => (
						<Fade key={ item.id } in={ true } timeout={ 750 }>
							<Grid item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>
								{React.createElement(ItemTemplate, {
									item: item,
									onClick: () => onResourceClick(item),
									onDelete: () => deleteResource(item),
								})}
							</Grid>
						</Fade>
					))}

					<Fade key='add' in={ true } timeout={ 1000 }>
						<Grid item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>
							{React.createElement(
								AddButtonTemplate,
								{},
								<AddButton onClick={ () => setDialog('add') } />
							)}
						</Grid>
					</Fade>
				</StaggeredAnimation>
			</Grid>

			{renderAddDialog({
				isOpen: dialog === 'add',
				onClose: () => setDialog(null),
				onSave: addResource,
			})}
		</React.Fragment>
	)
}

ResourceList.propTypes = {
	renderAddDialog: PropTypes.func.isRequired,

	items: PropTypes.array.isRequired,
	ItemTemplate: PropTypes.any.isRequired,
	AddButtonTemplate: PropTypes.any.isRequired,
	onResourceClick: PropTypes.func.isRequired,
	addResource: PropTypes.func.isRequired,
	deleteResource: PropTypes.func.isRequired,
	fullWidth: PropTypes.bool,
}

ResourceList.defaultProps = {
	fullWidth: false,
}

export default ResourceList
