import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

class Loadout extends Component {
	render() {
		let { loadout } = this.props

		return (
			<Card className='card'>
				<CardHeader title={ loadout.name } />
			</Card>
		)
	}
}

Loadout.propTypes = {
	loadout: PropTypes.object.isRequired
}

export default Loadout
