import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { Loading, Error } from 'app/shared/components'
import ArmoryItemSelect from './ArmoryItemSelect'

class AddArmoryItemDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			itemIds: [],
			items: [],
			loading: false,
			errorOnLoad: null,
			errorOnSave: null
		}
	}	

	componentDidMount = () => this.loadItems()

	componentWillUnmount = () => this.isUnmounted = true	

	loadItems() {
		if (this.isUnmounted) {
			return
		}

		this.setState({ loading: true, errorOnLoad: null }, () => {
			this.props.itemLoadFunc()
				.then((items) => !this.isUnmounted && this.setState({ items, loading: false }))
				.catch((err) => !this.isUnmounted && this.setState( { errorOnLoad: `An error occurred while loading ${this.props.category}.`, loading: false}))
		})
	}

	getSelectableItems() {
		return this.state.items.filter((a) => this.props.filterIds.indexOf(a.id) === -1)
	}

	onItemSelected(itemId) {
		this.setState(prevState => {
			let existingIdIndex = prevState.itemIds.findIndex(id => id === itemId)

			let copy = prevState.itemIds.slice()

			if (existingIdIndex === -1) {
				// If we're not allowing multiple, replace
				if (!this.props.allowMultiple && prevState.itemIds.length > 0) {
					copy[0] = itemId
				} else {
					copy.push(itemId)
				}
			} else {
				copy.splice(existingIdIndex, 1)
			}

			return { itemIds: copy }
		})
	}

	formValid() {
		return this.state.itemIds.length > 0
	}

	onSave(itemIds) {
		let data = this.props.allowMultiple ? itemIds : itemIds[0]

		this.setState({ loading: true, errorOnSave: false }, () => {
			this.props.onSave(data)
				.then(() => this.setState({ itemIds: [], loading: false }))
				.catch(err => this.setState({ loading: false, errorOnSave: `An error occurred while saving ${this.props.category}.` }))
		})
	}

	render() {
		let { itemIds, loading, errorOnLoad, errorOnSave } = this.state
		let { title, category, isOpen, onClose } = this.props

		return (
			<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
				<DialogTitle>{ title } </DialogTitle>

				<DialogContent>
					{ loading && <Loading /> }

					{ errorOnLoad && <Error error={ errorOnLoad } onRetry={ () => this.loadItems() } /> }
					{ errorOnSave && <Error error={ errorOnSave } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

					<ArmoryItemSelect
						items={ this.getSelectableItems() } 
						category={ category }
						selectedItemIds={ itemIds } 
						onItemSelected={ itemId => this.onItemSelected(itemId) } 
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() || loading }
						variant='contained'
						onClick={ () => this.onSave(itemIds) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddArmoryItemDialog.propTypes = {
	title: PropTypes.string.isRequired,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	itemLoadFunc: PropTypes.func.isRequired,
	allowMultiple: PropTypes.bool,
	filterIds: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

AddArmoryItemDialog.defaultProps = {
	filterIds: [],
	allowMultiple: false
}

export default AddArmoryItemDialog
