import './CardList.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddCard from './AddCard'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

class CardList extends Component {
	componentDidMount() {
		// Ensure we don't delay the animations once the component loaded
		this.loaded = true
	}

	renderItems(items) {
		return items.map(this.renderItem)
	}

	renderItem = (item, idx) => {
		return (
			<Card style={ { animationDelay: this.getAnimationDelay(idx) } } className={`card ${this.props.cardType}-card`} key={ idx }>
				<CardHeader title={ this.props.buildTitle(item) } subheader={ item.brand || '' } />
				<CardContent>{JSON.stringify(item)}</CardContent>
			</Card>
		)
	}

	getAnimationDelay = (idx) => {
		return this.loaded ? '0s' : `${0.2 * idx}s`
	}

	render() {
		let { items, onAdd, cardType } = this.props
		return (
			<div>
				<div className='card-list'>
					{this.renderItems(items)}
					<AddCard style={ { animationDelay: this.getAnimationDelay(items.length) } } onClick={ onAdd } cardType={cardType} />
				</div>
			</div>
		)
	}
}

CardList.propTypes = {
	items: PropTypes.array.isRequired,
	onAdd: PropTypes.func.isRequired,
	buildTitle: PropTypes.func,
	cardType: PropTypes.string
}

CardList.defaultProps = {
	buildTitle: (item) => item.title,
	cardType: 'weapon'
}

export default CardList
