import React from 'react'

import HomePageSegment from './HomePageSegment'

import ArmoryImage from 'assets/home/armory.png'
import LoadoutImage from 'assets/home/loadout.png'
import Ump45 from 'assets/ump45.png'

const segments = [
	{
		image: ArmoryImage,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		image: LoadoutImage,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	}
]

export default function HomePage() {
	return (
		<React.Fragment>
			<div>Im a homepage</div>

			{segments.map((segment, i) => 
				<HomePageSegment key={ i } text={ segment.text } image={ segment.image } />
			)}
		</React.Fragment>
	)
}