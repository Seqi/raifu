import React from 'react'

import HomePageSegment from './HomePageSegment'

import ArmoryImage from 'assets/home/armory.png'
import LoadoutImage from 'assets/home/loadout.png'
import EventsImage from 'assets/home/events.png'
import Ump45 from 'assets/ump45.png'

const segments = [
	{
		title: 'Inventory Management',
		image: ArmoryImage,
		text: 'Keep track and manage all of your airsoft weaponry, attachments, and gear.'
	},
	{
		title: 'Loadout Creation',
		image: LoadoutImage,
		text: 'Create your custom loadouts by creating combinations with your airsoft inventory, then share your loadouts online.'
	},
	{
		title: 'Event Planning',
		image: EventsImage,
		text: 'Manage upcoming events and assign a loadout to each. View a simple agenda of your upcoming events, and the loadout you plan to take'
	}
]

export default function HomePage() {
	return (
		<React.Fragment>
			<div>
				<div className='logo-box'>
					<span className='title'>Raifu</span>
					<img src={ Ump45 } alt='' />
				</div>
			</div>
			{segments.map((segment, i) => 
				<HomePageSegment key={ i } title={ segment.title } text={ segment.text } image={ segment.image } />
			)}
		</React.Fragment>
	)
}