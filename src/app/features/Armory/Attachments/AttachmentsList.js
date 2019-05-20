import React from 'react'

import AddAttachmentDialog from './AddAttachmentDialog'

import database from '../../../../firebase/database'
import CardListBaseComponent from 'app/shared/components/Lists/CardListBaseComponent'

class AttachmentsList extends CardListBaseComponent {
	get title() {
		return 'Attachments'
	}

	get items() {
		return database.attachments
	}

	get cardType() {
		return 'attachment'
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
