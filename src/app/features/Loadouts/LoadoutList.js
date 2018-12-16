import React from 'react'
import { withRouter } from 'react-router-dom'

import AddLoadoutDialog from './AddLoadoutDialog'

import database from '../../../firebase/database'
import CardListBaseComponent from '../../shared/components/Lists/CardListBaseComponent'
import CardList from '../../shared/components/Cards/CardList'

class LoadoutList extends CardListBaseComponent {
	get title() {
		return ''
	}

	get cardType() {
		return 'loadout'
	}

	get items() {
		return database.loadouts
	}

	buildCardTitle(loadout) {
		return loadout.name
	}

	buildCardContent(loadout) {
		let items = { ...loadout.primaries, ...loadout.secondaries }
		let view = {}

		// Bring the attachments up a level
		Object.keys(items)
			.forEach((weaponKey) => {
				view[weaponKey] = items[weaponKey]
				let weaponAttachments = items[weaponKey].attachments
				if (weaponAttachments) {
					Object.keys(weaponAttachments)
						.forEach((attachmentKey) => {
							view[attachmentKey] = weaponAttachments[attachmentKey]
						})
				}
			})
		return (
			<CardList
				items={ view }
				cardType={ 'attachment' }
				buildTitle={ (item) => item.title || item.nickname || `${item.platform} ${item.model}` }
				buildSubtitle={ (item) => item.brand || '' }
				buildCardContent={ () => undefined }
				canAdd={ false }
				canDelete={ false }
			/>
		)
	}

	view(id) {
		this.props.history.push(id)
	}

	render() {
		let { isAddDialogOpen } = this.state
		return (
			<React.Fragment>
				{super.render()}

				<AddLoadoutDialog
					isOpen={ isAddDialogOpen }
					onSave={ (value) => this.save(value) }
					onClose={ () => this.handleAddDialogClose() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(LoadoutList)
