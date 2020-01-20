import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

function calculateAddedXMargin(width, height, rotateBy) {
	// Calculate the new width when the box is rotated
	let newWidth = calculateBoundingBoxWidth(width, height, rotateBy)

	// Calculate how much width is added in total
	let diff = newWidth - width

	// Return what is required to add to an individual side-padding
	return diff / 2
}

function calculateBoundingBoxWidth(width, height, rotateBy) {
	// We want to make sure the container expands its bounding box
	// to contain the new length of the rotated image
	// https://stackoverflow.com/questions/3231176/how-to-get-size-of-a-rotated-rectangle
	let rads = rotateBy * (Math.PI / 180)

	return Math.abs(width * Math.cos(rads)) + Math.abs(height * Math.sin(rads))
}

function RotatedImage({image, rotateBy, style}) {
	let [containerRef] = useState(React.createRef())
	let [xMargin, setXMargin] = useState(0)
	
	let setNewXMargin = useCallback(() => {
		if (containerRef.current) {
			let ref = containerRef.current
			let newXMargin = calculateAddedXMargin(ref.offsetWidth, ref.offsetHeight, rotateBy)
			setXMargin(newXMargin)
		}
	}, [containerRef, rotateBy])

	useEffect(() => {
		window.addEventListener('resize', setNewXMargin)
		setTimeout(setNewXMargin, 10) // Hack for offsetHeight being unreliable? Idk whats going on

		return () => window.removeEventListener('resize', setNewXMargin)
	}, [setNewXMargin])
	
	return (
		<div className='rotated-image-container' ref={ containerRef } style={ { marginLeft: xMargin, marginRight: xMargin } }>
			<img alt=''
				src={ image }
				style={ { ...style, transform: `rotate(${rotateBy}deg)` } }
				onLoad={ setNewXMargin } 
			/>
		</div>
	)
}

RotatedImage.propTypes = {
	image: PropTypes.string.isRequired,
	rotateBy: PropTypes.number,
	style: PropTypes.object
}

RotatedImage.defaultProps = {
	rotateBy: 0,
	style: {}
}

export default RotatedImage
