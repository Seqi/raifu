import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

class ModifyWeapon extends Component {
	buildTitle() {
		let { weapon } = this.props
		return weapon.nickname || `${weapon.platform} ${weapon.model}`
	}

	buildSubtitle() {
		let { weapon } = this.props
		return weapon.brand
	}

	render() {
		return (
			<Card className='card weapon-card'>
				<CardHeader title={ this.buildTitle() } subheader={ this.buildSubtitle() } />
				<CardContent>{JSON.stringify(this.props.weapon)}</CardContent>
			</Card>
		)
	}
}

ModifyWeapon.propTypes = {
	weapon: PropTypes.object.isRequired
}

export default ModifyWeapon
