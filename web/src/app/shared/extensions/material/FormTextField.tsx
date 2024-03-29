import { Controller, ControllerProps } from 'react-hook-form'
import { TextField, TextFieldProps } from '@material-ui/core'

export type FormTextFieldProps<T> = TextFieldProps & {
	form: Omit<ControllerProps<T>, 'render'>
}

export function FormTextField<T>(props: FormTextFieldProps<T>) {
	const { form, ...textProps } = props

	return (
		<Controller
			{...form}
			render={({ field: { name, onBlur, onChange, value }, fieldState: { error } }) => (
				<TextField
					{...textProps}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value}
					error={!!error}
					helperText={error ? error.message : textProps.helperText}
				/>
			)}
		/>
	)
}
