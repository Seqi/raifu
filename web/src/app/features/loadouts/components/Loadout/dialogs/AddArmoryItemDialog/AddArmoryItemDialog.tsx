import { Component } from 'react'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'

import { Loading, Error } from 'app/shared/state'
import { Category } from 'app/data/constants/platforms'
import { ArmoryItem, ArmoryItemPropShape } from 'app/features/armory'

import ArmoryItemSelect from './ArmoryItemSelect'

type AddArmoryItemDialogProps = {
	items: ArmoryItem[]
	title: string
	category: Category
	isOpen: boolean
	onSave: (ids: string | string[]) => Promise<any>
	onClose: () => void
	allowMultiple?: boolean
}

type AddArmoryItemDialogState = {
	selectedIds: string[]
	loading: boolean
	error: string | null
}

class AddArmoryItemDialog extends Component<
	AddArmoryItemDialogProps,
	AddArmoryItemDialogState
> {
	private isUnmounted = false

	constructor(props: AddArmoryItemDialogProps) {
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
			const selectedItemIndex = selectedIds.findIndex((id) => id === item.id)

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
		const itemIdsToSave = this.props.allowMultiple ? itemIds : itemIds[0]

		this.setState({ loading: true, error: null }, () => {
			this.props
				.onSave(itemIdsToSave)
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
		const { selectedIds, loading, error } = this.state
		const { items, title, category, isOpen, onClose, allowMultiple } = this.props

		return (
			<Dialog open={isOpen} onClose={onClose} fullWidth={true}>
				<DialogTitle>{title}</DialogTitle>

				<DialogContent>
					{loading && <Loading />}

					{error && <Error error={error} fillBackground={true} />}

					<ArmoryItemSelect
						items={items}
						category={category}
						selectedItemIds={selectedIds}
						onItemSelected={(itemId) => this.onItemSelected(itemId)}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						disabled={!this.formValid() || loading}
						variant='contained'
						onClick={() => this.onSave(selectedIds)}
						color='primary'
					>
						Save
						{allowMultiple && selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}
					</Button>
				</DialogActions>
			</Dialog>
		)
	}

	public static propTypes = {
		title: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(PropTypes.shape(ArmoryItemPropShape)).isRequired,
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

export default AddArmoryItemDialog
