import { FC } from 'react'
import PropType from 'prop-types'

import { Grid, styled, Theme } from '@material-ui/core'

import { ArmoryCard, ArmoryItem } from 'app/features/armory'
import { Category } from 'app/data/constants/platforms'

const ResourceSelectCard = styled(({ active, ...other }) => <ArmoryCard { ...other } />)(
	// TODO: Hack to get this to work. Not sure how to do it properly
	({ theme, active }: { theme: Theme; active: boolean }) => ({
		transform: active ? 'scale(1.05)' : 'initial',
		border: active ? `1px solid ${theme.palette.primary.main}` : 'initial',
	})
)

const MobileGrid = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down(361)]: {
		flexBasis: '50%',
		maxWidth: '50%',
	},
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
	return (
		<Grid container={ true } spacing={ 2 }>
			{items.map((item) => (
				<MobileGrid key={ item.id } item={ true } xs={ 4 }>
					<ResourceSelectCard
						category={ category }
						item={ item }
						canDelete={ false }
						onDelete={ () => {} } // No op
						onClick={ () => onItemSelected(item) }
						active={ !!(selectedItemIds || []).find((id) => id === item.id) }
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
