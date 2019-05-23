import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { Loading } from 'app/shared/components'

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
			.then((items) => this.setState({ items, loading: false }))
			.catch((err) => {
				console.log('err', err)
				this.setState({ error: err.message, loading: false })
			})
	}

	renderItems(items) {
		return items.map((item, i) => (
			<MenuItem key={ item.id || i } value={ item.id || item }>
				{this.props.buildValue(item)}
			</MenuItem>
		))
	}

	render() {
		let { loading, error, items } = this.state
		let { label, name, value, onChange } = this.props

		return loading ? (
			<Loading />
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
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired
}

ResourceSelect.defaultProps = {
	value: '',
	buildValue: (item) => item
}

export default ResourceSelect
