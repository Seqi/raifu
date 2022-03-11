import { FC } from 'react'
import PropTypes from 'prop-types'
import { Grid, styled, Box, GridSize, Typography } from '@material-ui/core'

import { ArmoryItemImage } from 'app/features/armory'
import { Loadout, LoadoutPropType } from '../models'

const NoItemsContainer = styled(Box)(({ theme }) => ({
	fontSize: '1.6rem',
	'& i': {
		fontSize: '4rem',
	},

	[theme.breakpoints.down('xs')]: {
		fontSize: '1.3rem',
		'& i': {
			fontSize: '3rem',
		},
	},
	[theme.breakpoints.down(321)]: {
		fontSize: '1rem',
		'& i': {
			fontSize: '2rem',
		},
	},
}))

const LoadoutSummaryGrid = styled(Grid)(({ theme }) => ({
	height: '100%',
	marginTop: 'auto',
	marginBottom: 'auto',

	position: 'relative',
}))

// This is used to control the height of the images
// Not too sure why i gotta do this but it is what it is
const LoadoutSummaryGridItem = styled(Grid)(({ theme }) => ({
	height: '225px',
	maxWidth: '50%',

	[theme.breakpoints.down('xs')]: {
		height: '135px',
	},
	[theme.breakpoints.down(321)]: {
		height: '110px',
	},
}))

// Kinda hijack the mui badge here
const MoreItemsBadge = styled(Typography)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	right: '50%',
	transform: 'translateX(50%)',

	color: theme.palette.text.secondary,

	'& .MuiBadge-badge': {
		position: 'initial',
		transform: 'initial',
	},
}))

type LoadoutSummaryProps = {
	loadout: Loadout
}

const LoadoutSummary: FC<LoadoutSummaryProps> = ({ loadout }) => {
	if (!loadout.weapons || loadout.weapons.length === 0) {
		return (
			<NoItemsContainer
				height='100%'
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				fontSize='1.6rem'
				color='text.secondary'
			>
				<Box>
					<i className='far fa-sad-tear' />
				</Box>

				<span>There&lsquo;s nothing here!</span>
			</NoItemsContainer>
		)
	}

	const items = loadout.weapons
	const itemLimit = 2
	const additionalItems = itemLimit - items.length > 0 ? 0 : items.length
	const itemNumberExceedsLimit = additionalItems > 0

	const itemsToDisplay = itemNumberExceedsLimit ? items.slice(0, itemLimit) : items

	return (
		<LoadoutSummaryGrid
			spacing={2}
			container={true}
			wrap='wrap'
			justifyContent='space-around'
			alignItems='center'
		>
			{itemsToDisplay.map((weapon) => (
				<LoadoutSummaryGridItem
					item={true}
					key={weapon.id}
					lg={(12 / itemLimit) as GridSize}
				>
					<ArmoryItemImage resourceType='weapons' resource={weapon} />
				</LoadoutSummaryGridItem>
			))}

			{itemNumberExceedsLimit && (
				<MoreItemsBadge variant='subtitle2'>{`+ ${additionalItems} more`}</MoreItemsBadge>
			)}
		</LoadoutSummaryGrid>
	)
}

LoadoutSummary.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
}

export default LoadoutSummary
