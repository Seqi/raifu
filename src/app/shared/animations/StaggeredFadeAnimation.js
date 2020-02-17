import React, { useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

let fadeStyle = {
	'opacity': 0,
	'animationFillMode': 'forwards',
	'animationDuration': '1s',
	'animationIterationCount': 1,
	'animationName': 'fadein',
}

const StaggeredFadeAnimation = ({ minInterval, maxDuration, children }) => {
	let childCount = React.Children.count(children)

	let hasRendered = useRef(false)
	useEffect(() => { hasRendered.current = true }, [])

	let getAnimationDelay = useCallback((childIndex) => {
		// Once the initial animation has played out, we don't want to stagger anymore
		if (hasRendered.current) {
			return 0
		}

		let interval = minInterval

		// If no max duration is specified, we can simply stagger without worrying
		if (!maxDuration) {
			return interval * childIndex
		}

		// If the animation with the min interval will exceed the max duration,
		// cut the interval length to fit
		let animationWillExceedDuration = childCount * minInterval > maxDuration

		if (animationWillExceedDuration) {
			interval = maxDuration / childCount
		}

		return interval * childIndex
	}, [minInterval, maxDuration, childCount])

	return (
		React.Children.map(children, (child, index) => 
			React.cloneElement(child, {
				style: {
					...fadeStyle,
					animationDelay: `${getAnimationDelay(index)}s`
				}
			})
		)
	)
}

StaggeredFadeAnimation.propTypes = {
	minInterval: PropTypes.number,
	maxDuration: PropTypes.number,
}

StaggeredFadeAnimation.defaultProps = {
	minInterval: 0.2,
	maxDuration: 0
}

export default StaggeredFadeAnimation