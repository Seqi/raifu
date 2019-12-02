import React, { createElement } from 'react'
import { Link } from '@material-ui/core'

const announcements = [
	{
		id: 1,
		display: createElement(() => (
			<div>
				You can now invite other people to your events and plan your loadouts together! 
				Check the <Link color='textPrimary' target='_blank' style={ { textDecoration: 'underline' } } href='https://github.com/Seqi/raifu/releases/tag/1.1.0'> Release Notes</Link> for more info!
			</div>
		))
	}
]

export default announcements