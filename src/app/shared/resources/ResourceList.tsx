import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'

import { Grid, Fade } from '@material-ui/core'

import StaggeredAnimation from 'app/shared/animations/StaggeredAnimation'
import AddButton from 'app/shared/actions/add/AddButton'
import { ResourceCardLike } from '../cards/base/ResourceCard'
import { Resource } from '../models/resource'

type AddResourceDialogProps = {
	isOpen: boolean
	onClose: () => void
	onSave: (resource: Resource) => any
}

export type ResourceListProps<R extends Resource = Resource> = {
	renderAddDialog: (
		props: AddResourceDialogProps
	) => React.ComponentType<AddResourceDialogProps>
	items: R[]
	card: ResourceCardLike
	onResourceClick: (item: R) => any
	addResource: (resource: R) => any
	deleteResource: (id: string) => any
	fullWidth?: boolean
}

const ResourceList: FC<ResourceListProps> = ({
	renderAddDialog,
	items,
	card,
	onResourceClick,
	addResource,
	deleteResource,
	fullWidth,
}) => {
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
									canDelete: true,
									onClick: () => onResourceClick(item),
									onDelete: () => deleteResource(item.id),
								})}
							</Grid>
						</Fade>
					))}

					<Fade key='add' in={ true } timeout={ 1000 }>
						<Grid item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>
							{React.createElement(
								card.template,
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
