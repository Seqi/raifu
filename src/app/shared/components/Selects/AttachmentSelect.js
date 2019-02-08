import React, { Component } from 'react'
import PropType from 'prop-types'

import CascadingSelect from './CascadingSelect'

import database from '../../../../firebase/database'

class AttachmentSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			types: {}
		}
	}

	componentDidMount() {
		database.attachment
			.getTypes()
			.then((snap) => snap.val())
			.then((types) => this.setState({ types }))
	}

	render() {
		return (
			<React.Fragment>
				<CascadingSelect
					onChange={ this.props.onChange }
					options={ this.state.types }
					formatValues={ true }
					singularValues={ true }
					labels={ ['Type', 'Attachment'] }
					names={ ['type', 'platform'] }
				/>
			</React.Fragment>
		)
	}
}

AttachmentSelect.propTypes = {
	onChange: PropType.func.isRequired
}

export default AttachmentSelect
