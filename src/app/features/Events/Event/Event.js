import React from 'react'

import Typography from '@material-ui/core/Typography'

import Loader from 'app/shared/components/Loader'

import database from '../../../../firebase/database'

export default class Event extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			event: null
		}
	}

	componentDidMount() {		
		database.events.getById(this.props.match.params.id)
			.then(event => {
				if (!this.isUnmounted) {
					this.setState({ event: event, loading: false })
				}
			})
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}	

	render() {
		let { loading, error, event } = this.state

		if (loading) {			
			return <Loader />
		}
	
		if (error) {
			return <div className='error-alert'>Error: {error}</div>
		}

		return (
			<React.Fragment>
				<Typography variant='h3' >
					{ event.name }
					<i onClick={ () => this.openDialog('editloadout') } className='fa fa-pen icon-action' />
				</Typography>
			</React.Fragment>
		)
	}
}
