import { FC } from 'react'
import PropType from 'prop-types'

import { Grid, styled, Theme } from '@material-ui/core'

import { ArmoryCard } from 'app/features/armory'
import { Resource } from 'app/features/resource'
import { Category } from 'app/data/constants/platforms'

const ResourceSelectCard = styled(({ active, ...other }) => <ArmoryCard { ...other } />)(
	// TODO: Hack to get this to work. Not sure how to do it properly
	({ theme, active }: { theme: Theme; active: boolean }) => ({
		height: '220px',
		width: '161px',

		[theme.breakpoints.down('xs')]: {
			height: '170px',
			width: '124px',
		},

		transform: active ? 'scale(1.05)' : 'initial',
		border: active ? `1px solid ${theme.palette.primary.main}` : 'initial',
	})
)

type ResourceSelectProps<R extends Resource> = {
	items: R[]
	category: Category
	selectedItemIds?: string[]
	onItemSelected?: (item: R) => any
}

const ResourceSelect: FC<ResourceSelectProps<Resource>> = <R extends Resource>({
	items,
	category,
	selectedItemIds,
	onItemSelected = (item: R) => {},
}: ResourceSelectProps<R>) => {
	return (
		<Grid container={ true } spacing={ 2 } justify='space-around'>
			{items.map((item) => (
				<Grid key={ item.id } xs={ 6 } sm='auto' item={ true }>
					<ResourceSelectCard
						category={ category }
						item={ item }
						canDelete={ false }
						onDelete={ () => {} } // No op
						onClick={ () => onItemSelected(item) }
						active={ !!(selectedItemIds || []).find((id) => id === item.id) }
					/>
				</Grid>
			))}
		</Grid>
	)
}

ResourceSelect.propTypes = {
	items: PropType.array.isRequired,
	category: PropType.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	selectedItemIds: PropType.arrayOf(PropType.string.isRequired),
	onItemSelected: PropType.func,
}

ResourceSelect.defaultProps = {
	selectedItemIds: [],
	onItemSelected: (item: Resource) => {},
}

export default ResourceSelect
