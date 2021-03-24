import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Grid, Fade } from '@material-ui/core'

import StaggeredAnimation from 'app/shared/animations/StaggeredAnimation'
import AddButton from 'app/shared/actions/add/AddButton'
import { Resource } from '../models/resource'

export type AddResourceDialogProps<R extends Resource = Resource> = {
	isOpen: boolean
	onClose: () => void
	onSave: (resource: R) => Promise<any>
}

export type ResourceCardProps<R extends Resource = Resource> = {
	item: R
	onClick: () => void
	onDelete: () => Promise<void>
}

export type ResourceListProps<R extends Resource = Resource> = {
	items: R[]
	renderAddDialog: (props: AddResourceDialogProps<R>) => React.ReactNode
	card: React.ComponentType<ResourceCardProps<R>>
	cardContainer: React.ComponentType<any>
	onResourceClick: (item: R) => any
	addResource: (resource: R) => Promise<any>
	deleteResource: (item: R) => Promise<any>
	fullWidth?: boolean
}

export const ResourceList = <R extends Resource = Resource>({
	renderAddDialog,
	items,
	card,
	cardContainer,
	onResourceClick,
	addResource,
	deleteResource,
	fullWidth,
}: ResourceListProps<R>) => {
	let [dialog, setDialog] = useState<'add' | null>(null)

	return (
		<React.Fragment>
			<Grid container={ true } spacing={ 2 }>
				<StaggeredAnimation maxDuration={ 1 }>
					{items.map((item) => (
						<Fade key={ item.id } in={ true } timeout={ 1000 }>
							<Grid item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>
								{React.createElement(card, {
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
								cardContainer,
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
	card: PropTypes.any.isRequired,
	onResourceClick: PropTypes.func.isRequired,
	addResource: PropTypes.func.isRequired,
	deleteResource: PropTypes.func.isRequired,
	fullWidth: PropTypes.bool,
}

ResourceList.defaultProps = {
	fullWidth: false,
}

export default ResourceList
