import React, { Component } from 'react'
import { withTheme } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'

class AuthCardHeader extends Component {
	getStyle() {
		return {
			textAlign: 'center',
			backgroundColor: this.props.theme.palette.primary.main
		}
	}

	render() {
		return <CardHeader style={ this.getStyle() } title={ this.props.title } />
	}
}

AuthCardHeader.propTypes = {
	title: PropTypes.string.isRequired
}

export default withTheme()(AuthCardHeader)