import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'

import StaggeredAnimation from 'app/shared/animations/StaggeredAnimation'
import AddButton from 'app/shared/actions/add/AddButton'

const ResourceList = ({
	addDialog,
	items,
	card,
	onResourceClick,
	addResource,
	deleteResource,
	fullWidth,
}) => {
	let [dialog, setDialog] = useState(null)

	return (
		<React.Fragment>
			<Grid container={ true } spacing={ 2 }>
				<StaggeredAnimation maxDuration={ 1 }>

					{ items.map(item => (
						<Grid key={ item.id } item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>								
							{ React.createElement(card, {
								item: item,
								canDelete: true,
								onClick: () => onResourceClick(item),
								onDelete: (e) => deleteResource(item.id)}
							)}
						</Grid>
					))}
					
					<Grid item={ true } xs={ fullWidth ? 12 : 6 } sm={ fullWidth ? 12 : 'auto' }>
						{ React.createElement(card.template, {}, (
							<AddButton onClick={ addResource } />
						)) }
					</Grid>
				</StaggeredAnimation>
			</Grid>

			{ React.createElement(addDialog, {
				isOpen: dialog === 'add',
				onClose: () => setDialog(null),
				onSave: addResource
			}) }
		</React.Fragment>
	)
}

ResourceList.propTypes = {
	addDialog: PropTypes.func.isRequired,
	
	items: PropTypes.array.isRequired,
	card: PropTypes.func.isRequired,
	onResourceClick: PropTypes.func,
	addResource: PropTypes.func.isRequired,
	deleteResource: PropTypes.func.isRequired,
	fullWidth: PropTypes.bool,
}

ResourceList.defaultProps = {
	onResourceClick: (id) => { },
	fullWidth: false,
}

export default ResourceList