import { FC } from 'react'
import PropTypes from 'prop-types'
import { Badge, Grid, styled, Box } from '@material-ui/core'

import { ArmoryItemImage } from 'app/features/armory'
import { Loadout, LoadoutPropType } from '../models'

const LoadoutSummaryGrid = styled(Grid)(({ theme }) => ({
	height: '100%',
	marginTop: 'auto',
	marginBottom: 'auto',
}))

// This is used to control the height of the images
// Not too sure why i gotta do this but it is what it is
const LoadoutSummaryGridItem = styled(Grid)({
	height: '225px',
	position: 'relative',
})

// Kinda hijack the mui badge here
const MoreItemsBadge = styled(Badge)({
	position: 'absolute',
	top: '50%',
	right: 0,
	transform: 'translate(50%, -50%)',

	'& .MuiBadge-badge': {
		position: 'initial',
		transform: 'initial',
	},
})

type LoadoutSummaryProps = {
	loadout: Loadout
}

const LoadoutSummary: FC<LoadoutSummaryProps> = ({ loadout }) => {
	if (!loadout.weapons || loadout.weapons.length === 0) {
		return (
			<Box
				height='100%'
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				fontSize='1.6rem'
				color='text.secondary'
			>
				<Box fontSize='4rem'>
					<i className='far fa-sad-tear' />
				</Box>
				<span>There&lsquo;s nothing here!</span>
			</Box>
		)
	}

	const items = loadout.weapons
	const itemLimit = 4
	const additionalItems = itemLimit - items.length > 0 ? 0 : items.length
	const itemNumberExceedsLimit = additionalItems > 0

	const itemsToDisplay = itemNumberExceedsLimit ? items.slice(0, itemLimit) : items

	return (
		<LoadoutSummaryGrid
			spacing={ 2 }
			container={ true }
			wrap='wrap'
			justify='space-around'
			alignItems='center'
		>
			{itemsToDisplay.map((weapon, idx) => (
				<LoadoutSummaryGridItem item={ true } key={ weapon.id } lg={ 2 }>
					<ArmoryItemImage resourceType='weapons' resource={ weapon } />

					{/* Display badge on last item */}
					{itemNumberExceedsLimit && idx === itemLimit - 1 && (
						<MoreItemsBadge badgeContent={ `+ ${additionalItems} more` } color='default' />
					)}
				</LoadoutSummaryGridItem>
			))}
		</LoadoutSummaryGrid>
	)
}

LoadoutSummary.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
}

export default LoadoutSummary
