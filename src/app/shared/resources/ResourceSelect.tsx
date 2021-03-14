import React, { useState, useEffect, FC } from 'react'
import PropTypes from 'prop-types'
import { titleCase } from 'title-case'

import { styled, Popper, TextField, MenuItem } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { platforms } from 'app/data/constants'
import { Category } from 'app/data/constants/platforms'

const AutoCompletePopper = styled(Popper)({
	'& .MuiAutocomplete-groupLabel': {
		textTransform: 'uppercase',
	},
})

type ResourceSelectProps = {
	resourceType: Category
	inputLabel: string
	onChange: (value: { platform: string; type: string }) => any
}

export type SelectedResource = {
	platform: string
	type: string
}

const ResourceSelect: FC<ResourceSelectProps> = ({
	resourceType,
	inputLabel,
	onChange,
}) => {
	let [options, setOptions] = useState<SelectedResource[]>([])

	// For when an option isnt selected and the user is adding a non-listed
	let [showTypes, setShowTypes] = useState<boolean>(false)
	let [overrideValue, setOverrideValue] = useState<Partial<SelectedResource> | null>(null)

	// TODO: Type properly, this is lazy
	useEffect(() => {
		// { rifles: []..., smgs: []... }
		const types = platforms[resourceType]
		const typeKeys = Object.keys(types)

		// Converts { rifles: ['1', '2'...], smgs: ['3', '4'...]}
		// into [ { type: 'rifles', platform: '1'}, { type: 'rifles', platform: '2' } ... ]
		// for labeling
		const allOptions = typeKeys.reduce((options, type) => {
			const allPlatforms = types[type]
			const typeOptions = allPlatforms.map((p: any) => ({ platform: p, type: type }))

			return options.concat(...typeOptions)
		}, [])

		setOptions(allOptions)
	}, [resourceType])

	// Show override fields if an override value is set
	useEffect(() => setShowTypes(overrideValue !== null), [overrideValue])

	// Push changes of override back to parent
	useEffect(() => {
		if (overrideValue) {
			onChange(overrideValue as SelectedResource)
		}
	}, [onChange, overrideValue])

	function platformSelected(value: SelectedResource | string) {
		if (typeof value === 'string') {
			throw Error('Unexpected string!')
		}

		onChange(value)
		setOverrideValue(null)
	}

	function inputChanged(evt: any) {
		const input = evt.target.value

		// First check to see if what they've typed exists
		const option = options.find((o) => o.platform === input)

		// If it matches a resource, emit that
		if (option) {
			return platformSelected(option)
		} else {
			setOverrideValue({ ...(overrideValue || {}), platform: input })
		}
	}

	function typeSelected(evt: any) {
		setOverrideValue({ ...(overrideValue || {}), type: evt.target.value })
	}

	return (
		<React.Fragment>
			<Autocomplete
				freeSolo={ true }
				disableClearable={ true }
				options={ options }
				getOptionLabel={ (option) => option.platform }
				groupBy={ (option) => option.type }
				onChange={ (_, val) => platformSelected(val) }
				renderInput={ (params) => (
					<TextField
						{ ...params }
						fullWidth={ true }
						label={ inputLabel }
						onChange={ inputChanged }
					/>
				) }
				autoHighlight={ true }
				PopperComponent={ AutoCompletePopper }
			/>

			{showTypes && (
				<TextField
					label='Type'
					fullWidth={ true }
					defaultValue={ '' }
					onChange={ typeSelected }
					select={ true }
				>
					{Object.keys(platforms[resourceType])
						.map((type) => (
							<MenuItem key={ type } value={ type }>
								{titleCase(type)}
							</MenuItem>
						))}
				</TextField>
			)}
		</React.Fragment>
	)
}

ResourceSelect.propTypes = {
	inputLabel: PropTypes.string.isRequired,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default ResourceSelect
