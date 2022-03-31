import { useEffect } from 'react'

import { Container } from '@material-ui/core'

import useAnalytics from 'app/shared/hooks/useAnalytics'

import NavBar from '../../layout/Navbar/Navbar'
import { HomePageSegment, HomePageSegmentItem } from './HomePageSegment'
import ScrollingWeapons from './ScrollingWeapons'
import CallToAction from './CallToAction'
import LoadoutImage from './images/loadout.png'
import EventsImage from './images/event.png'
import SquadImage from './images/squad.png'

const segments: HomePageSegmentItem[] = [
	{
		title: 'Inventory Management',
		ImageComponent: ScrollingWeapons,
		text: `Keep track of everything in your own personal armory, from the specced out rifle, 
		to the old revolver you found in the basement, to the cheap red dot sight; and
		see where all those paychecks went.`,
	},
	{
		title: 'Loadout Creation',
		image: LoadoutImage,
		text: `Like to pretend to be SAS with an MP5? Or maybe a juggernaut 
		with an absurdly expensive shotgun? Group your gear into your preferred
		loadouts, or play around and find your next favorite.`,
	},
	{
		title: 'Event Planning',
		image: EventsImage,
		text: `Whether it's milsim Sundays or a weekend long wild west roleplay event,
		get an overview of all of your upcoming games, and invite your friends along.`,
	},
	{
		title: 'Squad Management',
		image: SquadImage,
		text: `Get a view of what everyone is bringing to your events. See if your buddy 
		is bringing their absurd airsoft RPG, or let them know you're taking that expensive 
		new sniper rifle.`,
	},
]

export default function HomePage() {
	const analytics = useAnalytics()
	useEffect(() => {
		analytics.logEvent('view_homepage')
	}, [analytics])

	return (
		<Container maxWidth='xl' fixed={true}>
			<NavBar paddingX={{ xs: 3, sm: 0, xl: 7 }} paddingY={{ xs: 3, md: 4, lg: 5 }} />

			<CallToAction paddingY={{ xs: 8, md: 14 }} paddingX={{ lg: 7 }} />

			<div>
				{segments.map((segment, i) => (
					<HomePageSegment key={i} segment={segment} />
				))}
			</div>
		</Container>
	)
}
