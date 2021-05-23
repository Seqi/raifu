import { Component } from 'react'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'

import { ResourcePropShape } from 'app/features/resource'
import { Loading, Error } from 'app/shared/state'
import { Category } from 'app/data/constants/platforms'

import ArmoryItemSelect from './ArmoryItemSelect'
import { ArmoryItem } from 'app/features/armory'

type AddResourceDialogProps = {
	items: ArmoryItem[]
	title: string
	category: Category
	isOpen: boolean
	onSave: (ids: string | string[]) => Promise<any>
	onClose: () => void
	allowMultiple?: boolean
}

type AddResourceDialogState = {
	selectedIds: string[]
	loading: boolean
	error: string | null
}

class AddResourceDialog extends Component<
	AddResourceDialogProps,
	AddResourceDialogState
> {
	private isUnmounted: boolean = false

	constructor(props: AddResourceDialogProps) {
		super(props)
		this.state = {
			selectedIds: [],
			loading: false,
			error: null,
		}
	}

	componentWillUnmount = () => (this.isUnmounted = true)

	onItemSelected(item: ArmoryItem): void {
		this.setState(({ selectedIds }) => {
			// TODO: Maybe just use sets?
			let selectedItemIndex = selectedIds.findIndex((id) => id === item.id)

			let newSelectedIds = [...selectedIds]

			if (selectedItemIndex === -1) {
				if (!this.props.allowMultiple && selectedIds.length > 0) {
					// If we're not allowing multiple, replace
					newSelectedIds = [item.id]
				} else {
					// Otherwise add
					newSelectedIds.push(item.id)
				}
			} else {
				// If it existed, remove from the selection
				newSelectedIds.splice(selectedItemIndex, 1)
			}

			return { selectedIds: newSelectedIds }
		})
	}

	formValid(): boolean {
		return this.state.selectedIds.length > 0
	}

	onSave(itemIds: string[]) {
		let data = this.props.allowMultiple ? itemIds : itemIds[0]

		this.setState({ loading: true, error: null }, () => {
			this.props
				.onSave(data)
				.then(
					() => !this.isUnmounted && this.setState({ selectedIds: [], loading: false })
				)
				.catch(
					(err) =>
						!this.isUnmounted &&
						this.setState({
							loading: false,
							error: `An error occurred while saving ${this.props.category}.`,
						})
				)
		})
	}

	render() {
		let { selectedIds, loading, error } = this.state
		let { items, title, category, isOpen, onClose, allowMultiple } = this.props

		return (
			<Dialog open={ isOpen } onClose={ onClose } fullWidth={ true }>
				<DialogTitle>{title}</DialogTitle>

				<DialogContent>
					{loading && <Loading />}

					{error && <Error error={ error } fillBackground={ true } />}

					{allowMultiple && selectedIds.length > 0 && (
						<DialogContentText>{selectedIds.length} items selected.</DialogContentText>
					)}

					<ArmoryItemSelect
						items={ items }
						category={ category }
						selectedItemIds={ selectedIds }
						onItemSelected={ (itemId) => this.onItemSelected(itemId) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() || loading }
						variant='contained'
						onClick={ () => this.onSave(selectedIds) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}

	public static propTypes = {
		title: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(PropTypes.shape(ResourcePropShape)).isRequired,
		category: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
			.isRequired,
		allowMultiple: PropTypes.bool,
		isOpen: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	}

	public static defaultProps = {
		allowMultiple: false,
	}
}

export default AddResourceDialog
