import { FC } from 'react'
import PropTypes from 'prop-types'

import ResourceImage from 'app/shared/images/ResourceImage'
import { Weapon } from '../models/armory-item'
import { Box, styled } from '@material-ui/core'

const WeaponDisplayContainer = styled(Box)({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',

	marginTop: '-30px',
	marginBottom: '-30px',
})

type WeaponDisplayProps = {
	weapons: Weapon[]
}

const WeaponDisplay: FC<WeaponDisplayProps> = ({ weapons }) => {
	if (!weapons || weapons.length === 0) {
		return <div>No items</div>
	}

	return (
		<WeaponDisplayContainer>
			{weapons.map((weapon) => (
				<div key={ weapon.id }>
					<ResourceImage resourceType='weapons' resource={ weapon } rotate={ true } />
				</div>
			))}
		</WeaponDisplayContainer>
	)
}

WeaponDisplay.propTypes = {
	weapons: PropTypes.array.isRequired,
}

export default WeaponDisplay
