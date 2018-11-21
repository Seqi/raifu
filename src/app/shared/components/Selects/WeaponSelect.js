import React, { Component } from 'react'
import PropType from 'prop-types'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import database from '../../../../firebase/database'

class WeaponSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			types: [],
			type: '',
			platforms: [],
			platform: ''
		}
	}

	componentDidMount() {
		database.platforms
			.getTypes()
			.then((types) =>
				types.map((type) => ({ key: type, value: this.convertToSingular(this.convertCamelCaseToLabel(type)) }))
			)
			.then((types) => this.setState({ types }))
	}

	convertCamelCaseToLabel(word) {
		let pascal = word.charAt(0)
			.toUpperCase() + word.substring(1)

		let words = pascal.match(/[A-Z][a-z]*/g)

		return words.join(' ')
	}

	convertToSingular(word) {
		let lastLetter = word.charAt(word.length - 1)

		if (lastLetter === 's') {
			return word.substring(0, word.length - 1)
		} else {
			return word
		}
	}

	handleTypeChange(e) {
		this.props.onChange(e)
		this.setState({ type: e.target.value, platform: '' })

		database.platforms.get(e.target.value)
			.then((platforms) => this.setState({ platforms }))
	}

	handlePlatformChange(e) {
		this.props.onChange(e)
		this.setState({ platform: e.target.value })
	}

	render() {
		let { types, type, platforms, platform } = this.state
		return (
			<React.Fragment>
				<TextField
					label='Weapon type'
					fullWidth={ true }
					value={ type }
					onChange={ (e) => this.handleTypeChange(e) }
					select={ true }
					SelectProps={ { name: 'type' } }
				>
					{types.map((type) => (
						<MenuItem key={ type.key } value={ type.key }>
							{type.value}
						</MenuItem>
					))}
				</TextField>

				{type && (
					<TextField
						label='Weapon platform'
						fullWidth={ true }
						value={ platform }
						onChange={ (e) => this.handlePlatformChange(e) }
						select={ true }
						SelectProps={ { name: 'platform' } }
					>
						{platforms.map((platform) => (
							<MenuItem key={ platform } value={ platform }>
								{platform}
							</MenuItem>
						))}
					</TextField>
				)}
			</React.Fragment>
		)
	}
}

WeaponSelect.propTypes = {
	onChange: PropType.func.isRequired
}

export default WeaponSelect
