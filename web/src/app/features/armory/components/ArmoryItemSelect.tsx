import React, { useState, useEffect, FC, useRef } from 'react'
import PropTypes from 'prop-types'

import { titleCase } from 'title-case'
import { styled, Popper, TextField, MenuItem, TextFieldProps } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { platforms, Category } from 'app/data/constants'

const AutoCompletePopper = styled(Popper)({
	'& .MuiAutocomplete-groupLabel': {
		textTransform: 'uppercase',
	},
})

type ArmoryItemSelectProps = {
	resourceType: Category
	inputLabel: string
	onChange: (value: { platform: string; type: string }) => any
	typeTextFieldProps?: TextFieldProps
	platformTextFieldProps?: TextFieldProps
}

type SelectedArmoryItem = {
	platform: string
	type: string
}

const ArmoryItemSelect: FC<ArmoryItemSelectProps> = ({
	resourceType,
	inputLabel,
	onChange,
	typeTextFieldProps,
	platformTextFieldProps,
}) => {
	// Used to prevent the initial render causing the
	const hasRendered = useRef<boolean>(false)
	const [options, setOptions] = useState<SelectedArmoryItem[]>([])
	const [value, setValue] = useState<SelectedArmoryItem>({ platform: '', type: '' })
	const [showTypes, setShowTypes] = useState<boolean>(false)

	// TODO: Type properly, this is lazy
	useEffect(() => {
		// { rifles: []..., smgs: []... }
		const types = platforms[resourceType]
		const typeKeys = Object.keys(types)

		// Converts { rifles: ['1', '2'...], smgs: ['3', '4'...]}
		// into [ { type: 'rifles', platform: '1'}, { type: 'rifles', platform: '2' } ... ]
		// for labeling
		const allOptions = typeKeys.reduce((options, type) => {
			const allPlatforms = (types as any)[type]
			const typeOptions = allPlatforms.map((p: any) => ({ platform: p, type: type }))

			return options.concat(...typeOptions)
		}, [])

		setOptions(allOptions)
	}, [resourceType])

	// Push changes of override back to parent
	// Prevent initial render from triggering validations
	useEffect(() => {
		if (hasRendered.current) {
			onChange(value)
		}
	}, [onChange, value])

	useEffect(() => {
		hasRendered.current = true
	})

	function inputChanged(input: string) {
		// First check to see if what they've typed exists
		const option = options.find(
			(o) => o.platform.toLocaleUpperCase() === input.toLocaleUpperCase()
		)

		// If it matches a resource, emit that
		if (option) {
			setShowTypes(false)
			setValue({ ...option, platform: input })
		} else {
			// Don't show types input if empty
			setShowTypes(input !== '')
			setValue({ ...value, platform: input })
		}
	}

	function typeSelected(evt: any) {
		setValue({ ...value, type: evt.target.value })
	}

	return (
		<>
			<Autocomplete
				freeSolo={true}
				options={options}
				inputValue={value.platform}
				onInputChange={(_, val) => inputChanged(val)}
				disableClearable={true}
				getOptionLabel={(option) => option.platform}
				groupBy={(option) => option.type}
				renderInput={(params) => (
					<TextField
						{...params}
						fullWidth={true}
						label={inputLabel}
						{...platformTextFieldProps}
					/>
				)}
				autoHighlight={true}
				PopperComponent={AutoCompletePopper}
			/>
			{showTypes && (
				<TextField
					label='Type'
					fullWidth={true}
					value={value.type}
					onChange={typeSelected}
					select={true}
					{...typeTextFieldProps}
				>
					{Object.keys(platforms[resourceType]).map((type) => (
						<MenuItem key={type} value={type}>
							{titleCase(type)}
						</MenuItem>
					))}
				</TextField>
			)}
		</>
	)
}

ArmoryItemSelect.propTypes = {
	inputLabel: PropTypes.string.isRequired,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	onChange: PropTypes.func.isRequired,
	typeTextFieldProps: PropTypes.object,
	platformTextFieldProps: PropTypes.object,
}

ArmoryItemSelect.defaultProps = {
	typeTextFieldProps: {},
	platformTextFieldProps: {},
}

export default ArmoryItemSelect
