import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import CardDeleteButton from '../CardDeleteButton'

export default class AttachmentCard extends React.Component {
	render() {
		let { attachment, canDelete, styles, onClick, onDelete, content } = this.props 

		return (
			<Card style={ styles } onClick={ onClick } className='card attachment-card' >
				{ canDelete && <CardDeleteButton onClick={ onDelete } /> }
				<CardHeader title={ attachment.getTitle() } subheader={ attachment.getSubtitle() } className='card-header' />
				<CardContent className='card-content'>
					{ content } 
				</CardContent>
			</Card>
		)
	}
}

AttachmentCard.propTypes = {
	attachment: PropTypes.object.isRequired,
	content: PropTypes.node.isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	styles: PropTypes.object,
}

AttachmentCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	styles: {}
}