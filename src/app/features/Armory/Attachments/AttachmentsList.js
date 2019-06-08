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
		return 'attachments'
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<React.Fragment>
				{super.render()}

				<AddAttachmentDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.setDialogOpen(false) }
				/>
			</React.Fragment>
		)
	}
}

export default AttachmentsList
