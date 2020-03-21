import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { styled, Popper } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const AutoCompletePopper = styled(Popper)({
	'& .MuiAutocomplete-groupLabel': {
		textTransform: 'uppercase'
	}
})

let ResourceSelect = ({ resourceOptions, onChange, renderInput }) => {

	let getOptions = useCallback(() => {
		return Object.keys(resourceOptions)
			.reduce((allOptions, type) => {
				let items = resourceOptions[type]
				let options = items.map(item => ({ platform: item, type }))
				
				return [...allOptions, ...options]
			}, [])
	}, [resourceOptions])
		
	return (
		<Autocomplete
			PopperComponent={ AutoCompletePopper }
			autoHighlight={ true }
			options={ getOptions() } 
			getOptionLabel={ option => option.platform }
			groupBy={ option => option.type }
			onChange={ (evt, value) => onChange(value) }
			renderInput={ renderInput }
		/>
	)
}

ResourceSelect.propTypes = {
	resourceOptions: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	renderInput: PropTypes.func.isRequired,
}

export default ResourceSelect
