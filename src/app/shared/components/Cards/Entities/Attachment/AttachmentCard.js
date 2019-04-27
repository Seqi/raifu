import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import CardImage from 'app/shared/components/Images/CardImage'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'

import './AttachmentCard.css'

export default function AttachmentCard({ attachment, canDelete, onClick, onDelete, style }) {
	return (
		<Card style={ style } onClick={ onClick } className='card attachment-card' >
			{ canDelete && <CardDeleteButton onClick={ onDelete } /> }
			<CardHeader title={ attachment.getTitle() } subheader={ attachment.getSubtitle() } className='card-header' />
			<CardContent className='card-content'>
				<CardImage entity={ attachment } category='attachments' />
			</CardContent>
		</Card>
	)
}

AttachmentCard.propTypes = {
	attachment: PropTypes.object.isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	style: PropTypes.object,
}

AttachmentCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	style: {}
}