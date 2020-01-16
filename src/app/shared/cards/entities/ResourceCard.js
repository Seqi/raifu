import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardHeader, CardContent } from '@material-ui/core'

import DeleteButton from 'app/shared/buttons/DeleteButton'

export default function ResourceCard({ resource, canDelete, onClick, onDelete, style, className, children }) {	
	return (
		<Card style={ style } onClick={ onClick } className={ `card ${className}` } >
			{ canDelete && <DeleteButton onClick={ onDelete } /> }

			<CardHeader title={ resource.getTitle() } subheader={ resource.getSubtitle() } className='card-header' />
			
			<CardContent className='card-content'>
				{ children }
			</CardContent>
		</Card>
	)
}

ResourceCard.propTypes = {
	resource: PropTypes.shape({
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired		
	}).isRequired,	
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,

	style: PropTypes.object,
	className: PropTypes.string.isRequired,
}

ResourceCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},

	style: {},
	className: '',
}