import React, { useState, useEffect } from 'react'

import HomePageSegment from './HomePageSegment'
import Logo from 'app/shared/components/Logo'

import ArmoryImage from 'assets/home/armory.png'
import LoadoutImage from 'assets/home/loadout.png'
import EventsImage from 'assets/home/events.png'

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
	let [isMobileMode, setIsMobileMode] = useState(calculateIsMobileMode(window.innerWidth))

	useEffect(() => {
		let onResize = () => {
			setIsMobileMode(calculateIsMobileMode(window.innerWidth))
		}

		window.addEventListener('resize', onResize)

		return () => window.removeEventListener('resize', onResize)
	}, [])

	function calculateIsMobileMode(width) {
		return width <= 768
	}

	return (
		<React.Fragment>
			<div>
				<Logo height={ isMobileMode ? '300px' : '400px' } subtitle='Airsoft loadout management' />
			</div>

			{segments.map((segment, i) => 
				<HomePageSegment key={ i } 
					title={ segment.title } 
					text={ segment.text } 
					image={ segment.image } 
					flip={ i % 2 === 0 }
					isMobileMode={ isMobileMode }
				/>
			)}
		</React.Fragment>
	)
}