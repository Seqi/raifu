import React from 'react'

class EditLoadout extends React.Component {
	render() {
		return <div>Hello im the edit loadout page! You are editing {this.props.match.params.id}</div>
	}
}

export default EditLoadout
