import React, { Component } from 'react'
import PropType from 'prop-types'

import CascadingSelect from 'app/shared/components/Selects/CascadingSelect'
import database from '../../../../firebase/database'

class WeaponSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			types: {}
		}
	}

	componentDidMount() {
		database.platforms
			.getTypes()
			.then((snap) => snap.val())
			.then((types) => this.filterTypes(types))
			.then((types) => this.setState({ types }))
	}

	filterTypes(types) {
		Object.keys(types)
			.forEach((type) => {
				if (!this.props.allowedTypes.find((allowedType) => allowedType.toLowerCase() === type.toLowerCase())) {
					delete types[type]
				}
			})

		return types
	}

	render() {
		return (
			<React.Fragment>
				<CascadingSelect
					onChange={ this.props.onChange }
					options={ this.state.types }
					formatValues={ true }
					singularValues={ true }
					labels={ ['Type', 'Platform'] }
					names={ ['type', 'platform'] }
				/>
			</React.Fragment>
		)
	}
}

WeaponSelect.propTypes = {
	onChange: PropType.func.isRequired,
	allowedTypes: PropType.array
}

WeaponSelect.defaultProps = {
	allowedTypes: []
}

export default WeaponSelect
