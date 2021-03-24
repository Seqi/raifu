import React, { useState, useCallback, useEffect, FC } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { Error } from 'app/shared/state'
import ResourceSelect from 'app/shared/resources/ResourceSelect'

import { brands } from 'app/data/constants'
import { AddResourceDialogProps } from 'app/shared/resources/ResourceList'
import { Category } from 'app/data/constants/platforms'
import { ArmoryItem } from 'app/shared/models/armory-item'

type AddArmoryItemProps = AddResourceDialogProps<ArmoryItem> & {
	resourceTitle: string
	resourceKey: Category
	resourceName: string
}

const AddArmoryItemDialog: FC<AddArmoryItemProps> = ({
	resourceTitle,
	resourceKey,
	resourceName,
	isOpen,
	onSave,
	onClose,
}) => {
	let [error, setError] = useState<string | null>(null)
	let { register, unregister, setValue, handleSubmit, formState } = useForm({
		mode: 'onChange',
	})

	// Necessary to register the two form type/platform values
	useEffect(() => {
		register({ name: 'type', value: '' }, { required: true })
		register({ name: 'platform', value: '' }, { required: true })

		// Reset the value if the dialog closes
		return () => unregister(['type', 'platform'])
	}, [register, unregister, isOpen])

	// Reset state when form closes
	useEffect(() => {
		!isOpen && setError(null)
	}, [isOpen])

	let handleSave = useCallback(
		(resource) => {
			return onSave(resource)
				.then(onClose)
				.catch((err: any) => setError('An error occurred while adding.'))
		},
		[onClose, onSave]
	)

	let setResource = useCallback(
		(resource) => {
			['type', 'platform'].forEach((key) =>
				setValue(key, resource ? resource[key] : '', {
					shouldDirty: true,
					shouldValidate: true,
				})
			)
		},
		[setValue]
	)

	return (
		<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
			<form onSubmit={ handleSubmit(handleSave) }>
				<DialogTitle>Add {resourceTitle}</DialogTitle>

				<DialogContent>
					{error && <Error error={ error } fillBackground={ true } />}

					<ResourceSelect
						inputLabel={ resourceName }
						resourceType={ resourceKey }
						onChange={ setResource }
					/>

					<Autocomplete
						options={ brands.slice() }
						freeSolo={ true }
						renderInput={ (params) => (
							<TextField
								name='brand'
								inputRef={ register }
								{ ...params }
								fullWidth={ true }
								label='Brand'
							/>
						) }
					/>

					<TextField
						name='model'
						label='Model'
						type='text'
						fullWidth={ true }
						inputRef={ register }
						helperText='E.g. Raider 2.0, Trident MK-II, Nighthawk'
					/>

					<TextField
						name='nickname'
						label='Nickname'
						type='text'
						fullWidth={ true }
						inputRef={ register }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ formState.isSubmitting || !formState.isValid }
						type='submit'
						variant='contained'
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

AddArmoryItemDialog.propTypes = {
	resourceTitle: PropTypes.string.isRequired,
	resourceKey: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	resourceName: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
}

export default AddArmoryItemDialog
