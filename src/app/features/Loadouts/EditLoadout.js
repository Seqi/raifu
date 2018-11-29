import React from 'react'
import { withRouter } from 'react-router-dom' 

import AddCard from '../../shared/components/Cards/AddCard'
import Loader from '../../shared/components/Loader'

import database from '../../../firebase/database'

class EditLoadout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadout: null,
			loading: true,
			error: null
		}
	}

	componentDidMount() {
		database.loadouts.getById(this.props.match.params.id)
			.then(loadout => this.setState({loadout, loading: false}))
			.catch(err => this.setState({ error: err.message, loading: false}))
	}

	componentWillUnmount() {
		// Clean up the url when navigating away
		this.props.history.push('../')
	}

	render() {
		let { loading, error, loadout } = this.state

		return loading ? (
				<Loader />
			) : error ? (
				<div className='error-alert'>Error: {error}</div>
			) : (
			<div>
				<h2>{ loadout.name }</h2>
				<div>
					<h3>ADD A PRIMARY</h3>
					<AddCard onClick={() => {}}/>
				</div>

				<div>
					<h3>ADD A SECONDARY</h3>
					<AddCard onClick={() => {}}/>
				</div>
			</div>
		)
	}
}

export default withRouter(EditLoadout)
