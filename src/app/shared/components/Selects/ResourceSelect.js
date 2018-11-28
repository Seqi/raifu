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
			.then(snap => snap.val() || [])
			.then((items) => this.setState({ items, loading: false }))
			.catch((err) => this.setState({ error: err.message, loading: false }))
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
				{items.map((item) => (
					<MenuItem key={ item } value={ item }>
						{item}
					</MenuItem>
				))}
			</TextField>
		)
	}
}

ResourceSelect.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	dataGetter: PropTypes.func.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
}

ResourceSelect.defaultProps = {
	value: ''
}

export default ResourceSelect
