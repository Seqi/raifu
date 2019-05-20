import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RotatedImage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			containerRef: React.createRef(),
			xMargin: 0
		}
	}

	setXMargin() {
		this.setState((prevState) => {
			return { xMargin: this.calculateAddedXMargin(prevState.containerRef) }
		})
	}

	calculateAddedXMargin(ref) {
		let boundingBoxWidth = this.calculateBoundingBoxWidth(ref)
		let diff = boundingBoxWidth - ref.current.offsetWidth

		return diff / 2
	}

	calculateBoundingBoxWidth(ref) {
		// We want to make sure the container expands its bounding box
		// to contain the new length of the rotated image
		// https://stackoverflow.com/questions/3231176/how-to-get-size-of-a-rotated-rectangle
		let x = ref.current.offsetWidth
		let y = ref.current.offsetHeight

		let rads = this.props.rotateBy * (Math.PI / 180)

		return Math.abs(x * Math.cos(rads)) + Math.abs(y * Math.sin(rads))
	}

	render() {
		let { image, rotateBy } = this.props
		let { containerRef, xMargin } = this.state

		return (
			<span ref={ containerRef } style={ { marginLeft: xMargin, marginRight: xMargin } }>
				<img onLoad={ () => this.setXMargin() } alt='' src={ image } style={ { transform: `rotate(${rotateBy}deg)` } } />
			</span>
		)
	}
}

RotatedImage.propTypes = {
	image: PropTypes.string.isRequired,
	rotateBy: PropTypes.number
}

RotatedImage.defaultProps = {
	rotateBy: 0
}

export default RotatedImage
