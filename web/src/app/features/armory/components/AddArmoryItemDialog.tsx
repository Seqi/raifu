import { useState, useEffect, FC, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { Error } from 'app/shared/state'
import { brands, Category } from 'app/data/constants'
import { AddResourceDialogProps } from 'app/features/resource'

import { ArmoryItem } from '../models/armory-item'
import ArmoryItemSelect from './ArmoryItemSelect'
import { TextFieldError } from 'app/shared/extensions/material/TextFieldError'

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
	let { register, unregister, setValue, control, formState, handleSubmit } = useForm({
		mode: 'onChange',
	})

	// Necessary to register the two form type/platform values
	useEffect(() => {
		register(
			{ name: 'type', value: '' },
			{
				required: { value: true, message: 'Brah' },
				maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
			}
		)
		register(
			{ name: 'platform', value: '' },
			{
				required: { value: true, message: 'Brah' },
				maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
			}
		)
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

					<ArmoryItemSelect
						inputLabel={ resourceName }
						resourceType={ resourceKey }
						onChange={ setResource }
						platformTextFieldProps={
							formState.errors.platform && {
								error: true,
								helperText: formState.errors.platform.message,
							}
						}
						typeTextFieldProps={
							formState.errors.type && {
								error: true,
								helperText: formState.errors.type.message,
							}
						}
					/>

					<Controller
						name='brand'
						control={ control }
						rules={ { maxLength: { value: 64, message: 'Cannot exceed 64 characters.' } } }
						defaultValue={ '' }
						render={ ({ onChange, onBlur, value, name }) => (
							<Autocomplete
								options={ brands.slice() }
								freeSolo={ true }
								onInputChange={ (_, val) => onChange(val) }
								inputValue={ value }
								renderInput={ (params) => (
									<TextFieldError
										{ ...params }
										name={ name }
										fullWidth={ true }
										label='Brand'
										formState={ formState }
									/>
								) }
								onBlur={ onBlur }
							/>
						) }
					/>

					<TextFieldError
						name='model'
						label='Model'
						type='text'
						fullWidth={ true }
						inputRef={ register({
							maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
						}) }
						helperText={ 'E.g. Raider 2.0, Trident MK-II, Nighthawk' }
						formState={ formState }
					/>

					<TextFieldError
						name='nickname'
						label='Nickname'
						type='text'
						fullWidth={ true }
						inputRef={ register({
							maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
						}) }
						formState={ formState }
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
