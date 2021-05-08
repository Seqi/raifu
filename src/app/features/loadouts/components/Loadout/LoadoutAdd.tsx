import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import AddButton from 'app/shared/actions/add/AddButton'

type LoadoutAddProps = {
	onClick: React.MouseEventHandler<HTMLButtonElement>
}

const LoadoutAdd: FC<LoadoutAddProps> = ({ onClick }) => {
	return (
		<Box width='100%' height='300px'>
			<AddButton onClick={ onClick } />
		</Box>
	)
}

LoadoutAdd.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export default LoadoutAdd
