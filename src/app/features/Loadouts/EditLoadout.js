import React from 'react'
import { withRouter } from 'react-router-dom' 

class EditLoadout extends React.Component {
	componentWillUnmount() {
		// Clean up the url when navigating away
		this.props.history.push('../')
	}

	render() {
		return <div>Hello im the edit loadout page! You are editing {this.props.match.params.id}</div>
	}
}

export default withRouter(EditLoadout)
