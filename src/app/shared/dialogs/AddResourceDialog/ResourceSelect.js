import React from 'react'
import PropType from 'prop-types'

import { useTheme } from '@material-ui/core'

import ArmoryCard from 'app/shared/cards/entities/ArmoryCard'
import './ResourceSelect.css'

function ResourceSelect ({ items, category, selectedItemIds, onItemSelected }) {
	let theme = useTheme()

	const selectedCardStyle = {
		transform: 'scale(1.05)',
		border: `1px solid ${theme.palette.primary.main}`
	}

	return (
		<div className='resource-select-list'>
			{ 
				items.map(item => 
					<ArmoryCard 
						key={ item.id } 
						category={ category }
						item={ item } 
						onClick={ () => onItemSelected(item.id) }
						className='resource-select-card'
						style={ selectedItemIds.find(id => id === item.id) ? selectedCardStyle : {} }
					/>
				)
			}
		</div>
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