import React from 'react'
import PropTypes from 'prop-types'

import WeaponDisplay from 'app/shared/images/WeaponDisplay'
import ResourceCard from './ResourceCard'

import './LoadoutCard.css'

export default function LoadoutCard({ resource, ...props }) {	
	return (
		<ResourceCard resource={ resource } className='loadout-card' { ...props }>
			<WeaponDisplay weapons={ resource.weapons } />
		</ResourceCard>
	)
}

LoadoutCard.propTypes = {
	resource: PropTypes.shape({
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
		weapons: PropTypes.arrayOf(PropTypes.shape({			
			platform: PropTypes.string.isRequired,
			model: PropTypes.string,
			attachments: PropTypes.arrayOf(PropTypes.shape({			
				platform: PropTypes.string.isRequired,
				model: PropTypes.string,
			}))
		})),
	}).isRequired,	
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,

	style: PropTypes.object,
}

LoadoutCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},

	style: {}
}