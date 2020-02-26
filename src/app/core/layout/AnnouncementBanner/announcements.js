import React, { createElement } from 'react'
import { Link } from '@material-ui/core'

const announcements = [
	{
		id: 1,
		display: createElement(() => (
			<React.Fragment>
				You can now invite other people to your events and plan your loadouts together! 
				Check the <Link color='textPrimary' target='_blank' style={ { textDecoration: 'underline' } } href='https://github.com/Seqi/raifu/releases/tag/1.1.0'> Release Notes</Link> for more info!
			</React.Fragment>
		)),
	},
	{
		id: 2,
		display: createElement(() => (
			<React.Fragment>
				Clothing has been added to the armory. Add your smocks to your loadouts!
				See the <Link color='textPrimary' target='_blank' style={ { textDecoration: 'underline' } } href='https://github.com/Seqi/raifu/releases/tag/1.2.0'> Release Notes</Link> for all changes.
			</React.Fragment>
		)),
	},
]

export default announcements