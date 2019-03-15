import React, { Component } from 'react'
import { WeaponList, AttachmentsList, GearList } from './'

class Armory extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='section-container'>
					<WeaponList />
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
