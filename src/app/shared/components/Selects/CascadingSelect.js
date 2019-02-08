import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { convertToSingular, convertCamelCaseToLabel } from '../../services/word-service'

class CascadingSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
	}

	handleSelectChanged(e) {
		this.props.onChange(e)
		this.setState({ value: e.target.value })
	}

	get options() {
		let { options } = this.props

		if (Array.isArray(options)) {
			return options
		}

		return Object.keys(options)
	}

	getSelectedChildren(option) {
		let { options } = this.props

		if (Array.isArray(options)) {
			return null
		}

		return options[option]
	}

	getValue(text) {
		let { formatValues, singluarValues } = this.props
		let result = text

		if (formatValues) {
			result = convertCamelCaseToLabel(result)
		}

		if (singluarValues) {
			result = convertToSingular(result)
		}

		return result
	}

	render() {
		let { value } = this.state
		let { labels, names, depth, onChange, formatValues, singluarValues } = this.props

		let children = this.getSelectedChildren(value)

		return (
			<React.Fragment>
				<TextField
					label={ labels[depth] }
					fullWidth={ true }
					value={ value }
					onChange={ (e) => this.handleSelectChanged(e) }
					select={ true }
					SelectProps={ { name: names[depth] } }
				>
					{this.options.map((option) => (
						<MenuItem key={ option } value={ option }>
							{this.getValue(option)}
						</MenuItem>
					))}
				</TextField>

				{children && (
					<CascadingSelect
						depth={ depth + 1 }
						names={ names }
						labels={ labels }
						formatLabels={ formatValues }
						singularLabels={ singluarValues }
						options={ children }
						onChange={ onChange }
					/>
				)}
			</React.Fragment>
		)
	}
}

CascadingSelect.propTypes = {
	formatValues: PropTypes.bool,
	singluarValues: PropTypes.bool,
	labels: PropTypes.array.isRequired,
	names: PropTypes.array.isRequired,
	depth: PropTypes.number,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	onChange: PropTypes.func.isRequired
}

CascadingSelect.defaultProps = {
	depth: 0,
	formatValues: false,
	singluarValues: false
}

export default CascadingSelect
