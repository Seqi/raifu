import { DeepMap, FieldError, FormState } from 'react-hook-form'
import { TextField, TextFieldProps } from '@material-ui/core'

const isFieldMessage = (e: any): e is FieldError => {
	return 'message' in e
}

// This isn't 100% accurate/missing types but it works for what I need
const getErrorMessage = (
	err: FieldError | FieldError[] | DeepMap<any, FieldError>[any]
): string | undefined => {
	if (!err) {
		return undefined
	}

	if (isFieldMessage(err)) {
		return err.message
	}

	if (Array.isArray(err)) {
		return err.map((e: FieldError) => e.message)
			.join(', ')
	}
}

export type FormTextField<TName extends string> = Omit<TextFieldProps, 'name'> & {
	name: TName
	formState: FormState<{ [key in TName]: any }>
}

export const TextFieldError = <TName extends string>({
	formState,
	...props
}: FormTextField<TName>) => (
		<TextField
			{ ...props }
			helperText={ getErrorMessage(formState.errors[props.name]) ?? props.helperText }
			error={ Boolean(formState.errors[props.name]) }
		/>
	)
