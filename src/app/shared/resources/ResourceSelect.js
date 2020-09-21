import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { styled, Popper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { platforms } from 'app/data/constants'

const AutoCompletePopper = styled(Popper)({
	'& .MuiAutocomplete-groupLabel': {
		textTransform: 'uppercase'
	}
})

const ResourceSelect = ({ resourceType, inputLabel, onChange }) => {
	let [options, setOptions] = useState([])

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

	return (
		<Autocomplete
			options={ options }
			getOptionLabel={ (option) => option.platform }
			groupBy={ (option) => option.type }
			onChange={ (evt, value) => onChange(value) }
			renderInput={ (params) => <TextField { ...params } fullWidth={ true } label={ inputLabel } /> }
			autoHighlight={ true }
			PopperComponent={ AutoCompletePopper }
		/>
	)
}

ResourceSelect.propTypes = {
	inputLabel: PropTypes.string.isRequired,
	resourceType: PropTypes.string.isRequired,
	resourceOptions: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
}

export default ResourceSelect
