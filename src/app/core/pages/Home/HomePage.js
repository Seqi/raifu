import React, { useEffect } from 'react'

import { Container } from '@material-ui/core'

import HomePageSegment from './HomePageSegment'
import Logo from '../../layout/Logo'

import ArmoryImage from 'assets/home/armory.png'
import LoadoutImage from 'assets/home/loadout.png'
import EventsImage from 'assets/home/events.png'
import EventLoadoutsImage from 'assets/home/eventloadouts.png'
import useAnalytics from 'app/shared/hooks/useAnalytics'

const segments = [
	{
		title: 'Inventory Management',
		image: ArmoryImage,
		text: 'Keep track and manage all of your airsoft weaponry, attachments, and gear.'
	},
	{
		title: 'Loadout Creation',
		image: LoadoutImage,
		text:
			'Create your custom loadouts by creating combinations with your airsoft inventory, then share your loadouts online.'
	},
	{
		title: 'Event Planning',
		image: EventsImage,
		text:
			'Manage upcoming events and assign a loadout to each. View a simple agenda of your upcoming events, and the loadout you plan to take'
	},
	{
		title: 'Squad Management',
		image: EventLoadoutsImage,
		text: 'Coordinate between you and your friends, keeping up to date with your entire squad\'s gear for the event.'
	}
]

export default function HomePage() {
	let analytics = useAnalytics()
	useEffect(() => {
		analytics.logEvent('view_homepage')
	}, [analytics])

	return (
		<Container maxWidth='xl' fixed={ true }>
			<Logo />

			<div>
				{segments.map((segment, i) => (
					<HomePageSegment
						key={ i }
						title={ segment.title }
						text={ segment.text }
						image={ segment.image }
						showBorder={ i > 0 }
					/>
				))}
			</div>
		</Container>
	)
}
