import React, { Component } from 'react'
import PropType from 'prop-types'

import CascadingSelect from 'app/shared/selects/CascadingSelect'
import database from '../../../firebase/database'

class WeaponSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			types: database.platforms.weapon
		}
	}

	render() {
		return (
			<React.Fragment>
				<CascadingSelect
					onChange={ this.props.onChange }
					options={ this.state.types }
					formatValues={ true }
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
