import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import Loader from '../Loader'

class ResourceSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
			loading: true,
			error: null
		}
	}

	componentDidMount() {
		this.props
			.dataGetter()
			.then((snap) => snap.val() || [])
			.then((items) => this.setState({ items, loading: false }))
			.catch((err) => this.setState({ error: err.message, loading: false }))
	}

	renderItems(items) {
		// Handle if the items are objects instead of properties
		if (items.length) {
			return items.map((item) => (
				<MenuItem key={ item } value={ item }>
					{item}
				</MenuItem>
			))
		} else {
			return Object.keys(items)
				.map((key) => (
					<MenuItem key={ key } value={ key }>
						{this.props.buildValue(items[key])}
					</MenuItem>
				))
		}
	}

	render() {
		let { loading, error, items } = this.state
		let { label, name, value, onChange } = this.props

		return loading ? (
			<Loader />
		) : error ? (
			<div className='error-alert'>{error}</div>
		) : (
			<TextField
				label={ label }
				fullWidth={ true }
				value={ value }
				onChange={ onChange }
				select={ true }
				SelectProps={ { name } }
			>
				{this.renderItems(items)}
			</TextField>
		)
	}
}

ResourceSelect.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	dataGetter: PropTypes.func.isRequired,
	buildValue: PropTypes.func,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
}

ResourceSelect.defaultProps = {
	value: '',
	buildValue: (item) => item
}

export default ResourceSelect
