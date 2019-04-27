import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import CardDeleteButton from '../CardDeleteButton'

export default class LoadoutCard extends React.Component {
	render() {
		let { title, subtitle, canDelete, styles, onClick, onDelete, content } = this.props 

		return (
			<Card style={ styles } onClick={ onClick } className='card loadout-card' >
				{ canDelete && <CardDeleteButton onClick={ onDelete } /> }
				<CardHeader title={ title } subheader={ subtitle } className='card-header' />
				<CardContent className='card-content'>
					{ content } 
				</CardContent>
			</Card>
		)
	}
}

LoadoutCard.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	content: PropTypes.node.isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	styles: PropTypes.object,
}

LoadoutCard.defaultProps = {
	title: '',
	subtitle: '',
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	styles: {}
}