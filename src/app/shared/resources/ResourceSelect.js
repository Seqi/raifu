import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { titleCase } from 'title-case'

import { styled, Popper, TextField, MenuItem } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { platforms } from 'app/data/constants'

const AutoCompletePopper = styled(Popper)({
	'& .MuiAutocomplete-groupLabel': {
		textTransform: 'uppercase'
	}
})

const ResourceSelect = ({ resourceType, inputLabel, onChange }) => {
	let [options, setOptions] = useState([])

	// For when an option isnt selected and the user is adding a non-listed
	let [showTypes, setShowTypes] = useState(false)
	let [overrideValue, setOverrideValue] = useState(null)

	useEffect(() => {
		// { rifles: []..., smgs: []... }
		const types = platforms[resourceType]
		const typeKeys = Object.keys(types)

		// Converts { rifles: ['1', '2'...], smgs: ['3', '4'...]}
		// into [ { type: 'rifles', platform: '1'}, { type: 'rifles', platform: '2' } ... ]
		// for labeling
		const allOptions = typeKeys.reduce((options, type) => {
			const allPlatforms = types[type]
			const typeOptions = allPlatforms.map((p) => ({ platform: p, type: type }))

			return options.concat(...typeOptions)
		}, [])

		setOptions(allOptions)
	}, [resourceType])

	// Show override fields if an override value is set
	useEffect(() => setShowTypes(overrideValue !== null), [overrideValue])

	// Push changes of override back to parent
	useEffect(() => {
		if (overrideValue) {
			onChange(overrideValue)
		}
	}, [onChange, overrideValue])

	function platformSelected(evt, value) {
		onChange(value)
		setOverrideValue(null)
	}

	function inputChanged(evt) {
		setOverrideValue({ ...(overrideValue || {}), platform: evt.target.value })
	}

	function typeSelected(evt) {
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
				onChange={ platformSelected }
				renderInput={ (params) => (
					<TextField { ...params } fullWidth={ true } label={ inputLabel } onChange={ inputChanged } />
				) }
				autoHighlight={ true }
				PopperComponent={ AutoCompletePopper }
			/>

			{showTypes && (
				<TextField label='Type' fullWidth={ true } defaultValue={ '' } onChange={ typeSelected } select={ true }>
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
	resourceType: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default ResourceSelect
