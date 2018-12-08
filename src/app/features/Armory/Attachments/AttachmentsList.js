import React from 'react'

import AddAttachmentDialog from './AddAttachmentDialog'

import database from '../../../../firebase/database'
import CardListBaseComponent from '../../../shared/components/Lists/CardListBaseComponent'

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

	buildCardTitle(item) {
		return item.title
	}

	buildCardSubtitle(item) {
		return ''
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
