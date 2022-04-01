import { Controller, ControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '@material-ui/core'

type FormTextFieldProps<T> = TextFieldProps & {
	form: Omit<ControllerProps<T>, 'render'>
}

export const FormTextField = <T,>(props: FormTextFieldProps<T>) => {
	const { form, ...textProps } = props

	return (
		<Controller
			control={form.control}
			name={form.name}
			rules={form.rules}
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
