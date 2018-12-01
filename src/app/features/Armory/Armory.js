import './Armory.css'
import React, { Component } from 'react'
import { PrimariesList, SecondariesList, AttachmentsList, GearList } from './'

class Armory extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='section-container'>
					<div className='weapons-list-container'>
						<PrimariesList />
					</div>
					<div className='weapons-list-container'>
						<SecondariesList />
					</div>
				</div>
				<div className='section-container'>
					<AttachmentsList />
				</div>
				<div className='section-container'>
					<GearList />
				</div>
			</React.Fragment>
		)
	}
}

export default Armory
