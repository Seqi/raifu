import React from 'react'
import PropType from 'prop-types'

import { Grid, styled } from '@material-ui/core'

import { ArmoryCard } from 'app/shared/cards'

const ResourceSelectCard = styled(
	({ active, ...other }) => <ArmoryCard { ...other } />
)(({ theme, active }) => ({	
	height: '220px',
	width: '161px',

	[theme.breakpoints.down('xs')]: {
		height: '170px',
		width: '124px'
	},
	
	transform: active ? 'scale(1.05)' : 'initial',
	border: active ? `1px solid ${theme.palette.primary.main}` : 'initial',
}))

function ResourceSelect ({ items, category, selectedItemIds, onItemSelected }) {
	return (
		<Grid container={ true } spacing={ 2 } justify='space-around'>
			{ 
				items.map(item => (
					<Grid key={ item.id } xs={ 6 } sm='auto' item={ true }>
						<ResourceSelectCard
							category={ category }
							item={ item } 
							onClick={ () => onItemSelected(item.id) }
							active={ !!selectedItemIds.find(id => id === item.id) }
						/>
					</Grid>
				))
			}
		</Grid>
	)
}

ResourceSelect.propTypes = {
	items: PropType.array,
	category: PropType.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	selectedItemIds: PropType.arrayOf(PropType.string),
	onItemSelected: PropType.func
}

ResourceSelect.defaultProps = {
	items: [],
	selectedItemIds: [],
	onItemSelected: (item) => {}
}

export default ResourceSelect