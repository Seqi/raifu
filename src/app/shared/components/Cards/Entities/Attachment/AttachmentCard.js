import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'
import DeleteButton from 'app/shared/components/Buttons/DeleteButton'

import './AttachmentCard.css'

export default function AttachmentCard({ attachment, canDelete, onClick, onDelete, style }) {
	return (
		<Card style={ style } onClick={ onClick } className='card attachment-card' >
			{ canDelete && <DeleteButton onClick={ onDelete } /> }
			<CardHeader title={ attachment.getTitle() } subheader={ attachment.getSubtitle() } className='card-header' />
			<CardContent className='card-content'>
				<ArmoryItemImage entity={ attachment } category='attachments' />
			</CardContent>
		</Card>
	)
}

AttachmentCard.propTypes = {
	attachment: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
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