import { useState, useEffect, useCallback, FC, useRef } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	fill: {
		width: '100%',
		height: '100%',
	},
})

function calculateAddedXMargin(width: number, height: number, rotateBy: number): number {
	// Calculate the new width when the box is rotated
	const newWidth = calculateBoundingBoxWidth(width, height, rotateBy)

	// Calculate how much width is added in total
	const diff = newWidth - width

	// Return what is required to add to an individual side-padding
	return diff / 2
}

function calculateBoundingBoxWidth(
	width: number,
	height: number,
	rotateBy: number
): number {
	// We want to make sure the container expands its bounding box
	// to contain the new length of the rotated image
	// https://stackoverflow.com/questions/3231176/how-to-get-size-of-a-rotated-rectangle
	let rads = rotateBy * (Math.PI / 180)

	return Math.abs(width * Math.cos(rads)) + Math.abs(height * Math.sin(rads))
}

type RotatedImageProps = {
	image: string
	rotateBy?: number
}

const RotatedImage: FC<RotatedImageProps> = ({ image, rotateBy }) => {
	let containerRef = useRef<HTMLDivElement>(null)
	let [xMargin, setXMargin] = useState(0)

	let setNewXMargin = useCallback(() => {
		if (containerRef.current) {
			let ref = containerRef.current

			let newXMargin = calculateAddedXMargin(
				ref.offsetWidth,
				ref.offsetHeight,
				rotateBy || 0
			)

			setXMargin(newXMargin)
		}
	}, [containerRef, rotateBy])

	useEffect(() => {
		window.addEventListener('resize', setNewXMargin)
		setTimeout(setNewXMargin, 10) // Hack for offsetHeight being unreliable? Idk whats going on

		return () => window.removeEventListener('resize', setNewXMargin)
	}, [setNewXMargin])

	let classes = useStyles()

	return (
		<div
			className={ classes.fill }
			ref={ containerRef }
			style={ { paddingLeft: xMargin, paddingRight: xMargin } }
		>
			<img
				alt=''
				src={ image }
				className={ classes.fill }
				style={ { transform: `rotate(${rotateBy}deg)` } }
				onLoad={ setNewXMargin }
			/>
		</div>
	)
}

RotatedImage.propTypes = {
	image: PropTypes.string.isRequired,
	rotateBy: PropTypes.number,
}

RotatedImage.defaultProps = {
	rotateBy: 0,
}

export default RotatedImage
