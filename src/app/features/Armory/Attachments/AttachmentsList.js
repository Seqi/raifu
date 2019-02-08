import React from 'react'

import AddAttachmentDialog from './AddAttachmentDialog'

import database from '../../../../firebase/database'
import CardListBaseComponent from '../../../shared/components/Lists/CardListBaseComponent'
import { getAttachmentImage } from '../../../shared/services/card-image-service'

class AttachmentsList extends CardListBaseComponent {
	get title() {
		return 'ATTACHMENTS'
	}

	get items() {
		return database.attachments
	}

	get cardType() {
		return 'attachment'
	}

	buildCardTitle(attachment) {
		return attachment.nickname || `${attachment.platform}`
	}

	buildCardSubtitle(item) {
		return item.brand || ''
	}

	buildCardContent(item) {
		let demo = Math.floor(Math.random() * 2) ? 'surpressor' : 'reddot'

		let img = getAttachmentImage(demo)

		if (img) {
			return <img className='card-img-skew' alt={ item.name } src={ img } />
		}
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<div>
				{super.render()}

				<AddAttachmentDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</div>
		)
	}
}

export default AttachmentsList
