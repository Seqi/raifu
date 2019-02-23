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
		database.platforms.getTypes()
			.then((snap) => this.setState({ types: snap.val() }))
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
	onChange: PropType.func.isRequired
}

export default WeaponSelect
