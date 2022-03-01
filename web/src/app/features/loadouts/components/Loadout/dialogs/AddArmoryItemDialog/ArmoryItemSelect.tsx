import { FC } from 'react'
import PropType from 'prop-types'

import { Grid, styled, makeStyles } from '@material-ui/core'

import { ArmoryCard, ArmoryItem } from 'app/features/armory'
import { Category } from 'app/data/constants/platforms'


const MobileGrid = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down(391)]: {
		flexBasis: '50%',
		maxWidth: '50%',
	},
}))

const useStyles = makeStyles((theme) => ({
	'select-card': {
		'&:hover': {
			transform: 'initial'
		}
	},
	'selected-card': {
		border: `1px solid ${theme.palette.primary.main}`,
		'&:hover': {
			transform: 'initial'
		}
	}
}))

type ResourceSelectProps<Item extends ArmoryItem> = {
	items: Item[]
	category: Category
	selectedItemIds?: string[]
	onItemSelected?: (item: Item) => any
}

const ArmoryItemSelect: FC<ResourceSelectProps<ArmoryItem>> = <Item extends ArmoryItem>({
	items,
	category,
	selectedItemIds,
	onItemSelected = (item: Item) => {},
}: ResourceSelectProps<Item>) => {
	const classes = useStyles()

	return (
		<Grid container={ true } spacing={ 2 }>
			{items.map((item) => (
				<MobileGrid key={ item.id } item={ true } xs={ 4 }>
					<ArmoryCard
						category={ category }
						item={ item }
						canDelete={ false }
						onDelete={ () => Promise.resolve() } // No op
						onClick={ () => onItemSelected(item) }
						cardProps={ {
							className: [classes['select-card'],  (selectedItemIds || []).find((id) => id === item.id) ? classes['selected-card'] : ''].join(' ')
						} }
					/>
				</MobileGrid>
			))}
		</Grid>
	)
}

ArmoryItemSelect.propTypes = {
	items: PropType.array.isRequired,
	category: PropType.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	selectedItemIds: PropType.arrayOf(PropType.string.isRequired),
	onItemSelected: PropType.func,
}

ArmoryItemSelect.defaultProps = {
	selectedItemIds: [],
	onItemSelected: (item: ArmoryItem) => {},
}

export default ArmoryItemSelect
