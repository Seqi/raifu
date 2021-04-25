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
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et arcu dictum dis faucibus tellus sit viverra et. Volutpat lobortis vel amet, id ut diam.',
	},
	{
		title: 'Loadout Creation',
		image: LoadoutImage,
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et arcu dictum dis faucibus tellus sit viverra et. Volutpat lobortis vel amet, id ut diam.',
	},
	{
		title: 'Event Planning',
		image: EventsImage,
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et arcu dictum dis faucibus tellus sit viverra et. Volutpat lobortis vel amet, id ut diam.',
	},
	{
		title: 'Squad Management',
		image: SquadImage,
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et arcu dictum dis faucibus tellus sit viverra et. Volutpat lobortis vel amet, id ut diam.',
	},
]

export default function HomePage() {
	let analytics = useAnalytics()
	useEffect(() => {
		analytics.logEvent('view_homepage')
	}, [analytics])

	return (
		<Container maxWidth='xl' fixed={ true }>
			<NavBar />

			<CallToAction paddingY={ { xs: 8, md: 14 } } paddingX={ { lg: 7 } } />

			<div>
				{segments.map((segment, i) => (
					<HomePageSegment key={ i } segment={ segment } />
				))}
			</div>
		</Container>
	)
}
