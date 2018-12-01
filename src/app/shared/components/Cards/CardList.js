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
		return Object.keys(items || {})
			.map((key, idx) => {
				return this.renderItem(key, items[key], idx)
			})
	}

	renderItem = (key, item, idx) => {
		let { buildTitle, buildSubtitle, onCardClick } = this.props

		return (
			<Card
				onClick={ () => onCardClick(key) }
				style={ { animationDelay: this.getAnimationDelay(idx) } }
				className={ `card ${this.props.cardType}-card` }
				key={ idx }
			>
				<CardHeader title={ buildTitle(item) } subheader={ buildSubtitle(item) } />
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
			<div className='card-list'>
				{this.renderItems(items)}
				<AddCard
					style={ { animationDelay: this.getAnimationDelay(Object.keys(items || {}).length) } }
					onClick={ onAdd }
					cardType={ cardType }
				/>
			</div>
		)
	}
}

CardList.propTypes = {
	items: PropTypes.object,
	onAdd: PropTypes.func.isRequired,
	onCardClick: PropTypes.func,
	buildTitle: PropTypes.func,
	buildSubtitle: PropTypes.func,
	cardType: PropTypes.string
}

CardList.defaultProps = {
	items: {},
	buildTitle: (item) => item.title,
	buildSubtitle: (item) => item.brand,
	onCardClick: () => {},
	cardType: 'weapon'
}

export default CardList
