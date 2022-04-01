import { useState, useEffect, FC, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

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
import { FormTextField } from 'app/shared/extensions/material/FormTextField'

import { ArmoryItem } from '../models/armory-item'
import ArmoryItemSelect from './ArmoryItemSelect'

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
	const [error, setError] = useState<string | null>(null)
	const { register, unregister, setValue, control, formState, handleSubmit } =
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
			required: { value: true, message: 'Brah' },
			maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
		})

		// Reset the value if the dialog closes
		return () => unregister(['type', 'platform'])
	}, [register, unregister, isOpen])

	// Reset state when form closes
	useEffect(() => {
		!isOpen && setError(null)
	}, [isOpen])

	const handleSave = useCallback(
		(resource) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			return onSave(resource)
				.then(onClose)
				.catch((err: any) => setError('An error occurred while adding.'))
		},
		[onClose, onSave]
	)

	const setResource = useCallback(
		(resource) => {
			;(['type', 'platform'] as const).forEach((key) =>
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
			{/* Think this may be a bug... Not sure why it isn't working.. */}
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
						typeTextFieldProps={
							formState.errors.type && {
								error: true,
								helperText: formState.errors.type.message,
							}
						}
					/>

					<Controller
						name='brand'
						control={control}
						rules={{ maxLength: { value: 64, message: 'Cannot exceed 64 characters.' } }}
						defaultValue=''
						render={({ field, fieldState }) => (
							<Autocomplete
								options={brands.slice()}
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
										helperText={fieldState.error?.message}
									/>
								)}
							/>
						)}
					/>

					<FormTextField
						form={{
							name: 'model',
							control,
							rules: {
								maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
							},
						}}
						label='Model'
						type='text'
						fullWidth={true}
						helperText='E.g. Raider 2.0, Trident MK-II, Nighthawk'
					/>

					<FormTextField
						form={{
							name: 'nickname',
							control: control,
							rules: {
								maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
							},
						}}
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
