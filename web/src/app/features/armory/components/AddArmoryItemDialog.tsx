import { useState, useEffect, FC, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { Error } from 'app/shared/state'
import { brands, Category } from 'app/data/constants'
import { AddResourceDialogProps } from 'app/features/resource'

import { ArmoryItem } from '../models/armory-item'
import ArmoryItemSelect from './ArmoryItemSelect'
import { FormTextField } from 'app/shared/extensions/material/FormTextField'

type AddArmoryItemProps = AddResourceDialogProps<ArmoryItem> & {
	resourceTitle: string
	resourceKey: Category
	resourceName: string
}

type AddArmoryItemForm = {
	type: string
	platform: string
	brand: string
	model: string
	nickname: string
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
	let { register, unregister, setValue, control, formState, handleSubmit } =
		useForm<AddArmoryItemForm>({
			mode: 'onChange',
		})

	// Necessary to register the two form type/platform values
	useEffect(() => {
		register('type', {
			required: { value: true, message: 'Brah' },
			maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
		})

		register('platform', {
			required: { value: true, message: 'Weapon is required.' },
			maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
		})

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
			;(['type', 'platform'] as const).forEach((key) =>
				setValue(key, resource ? resource[key] : '', {
					shouldDirty: true,
					shouldValidate: true,
				})
			)
		},
		[setValue]
	)

	return (
		<Dialog fullWidth={true} open={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(handleSave)}>
				<DialogTitle>Add {resourceTitle}</DialogTitle>

				<DialogContent>
					{error && <Error error={error} fillBackground={true} />}

					<ArmoryItemSelect
						inputLabel={resourceName}
						resourceType={resourceKey}
						onChange={setResource}
						platformTextFieldProps={
							formState.errors.platform && {
								error: true,
								helperText: formState.errors.platform.message,
							}
						}
						typeTextFieldProps={{
							id: 'add-item-type-field',
							...(formState.errors.type && {
								error: true,
								helperText: formState.errors.type.message,
							}),
						}}
					/>

					<Controller
						name='brand'
						control={control}
						rules={{ maxLength: { value: 64, message: 'Cannot exceed 64 characters.' } }}
						defaultValue=''
						render={({ field, fieldState }) => (
							<Autocomplete
								options={brands.slice()}
								autoHighlight={true}
								freeSolo={true}
								onInputChange={(_, val) => field.onChange(val)}
								onBlur={field.onBlur}
								inputValue={field.value}
								renderInput={(params) => (
									<TextField
										{...params}
										ref={field.ref}
										name={field.name}
										fullWidth={true}
										label='Brand'
										error={!!fieldState.error}
										helperText={fieldState.error && fieldState.error.message}
									/>
								)}
							/>
						)}
					/>

					<FormTextField
						form={{
							name: 'model',
							control,
							defaultValue: '',
							rules: {
								maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
							},
						}}
						id='add-item-field-model'
						label='Model'
						type='text'
						fullWidth={true}
						helperText={'E.g. Raider 2.0, Trident MK-II, Nighthawk'}
					/>

					<FormTextField
						form={{
							name: 'nickname',
							control: control,
							defaultValue: '',
							rules: {
								maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
							},
						}}
						id='add-item-field-nickname'
						label='Nickname'
						type='text'
						fullWidth={true}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						disabled={formState.isSubmitting || !formState.isValid}
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
