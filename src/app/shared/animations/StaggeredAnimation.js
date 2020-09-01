import React, { useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const StaggeredAnimation = ({ minInterval, maxDuration, freezeAfterInitial, children }) => {
	let childCount = React.Children.count(children)

	let hasRendered = useRef(false)
	useEffect(() => {
		hasRendered.current = true
	}, [])

	let getAnimationDelay = useCallback(
		(childIndex) => {
			// If requested, once the initial animation has played out, we don't want to stagger anymore
			if (freezeAfterInitial && hasRendered.current) {
				return 0
			}

			let interval = minInterval

			// If no max duration is specified, we can simply stagger without worrying
			if (!maxDuration) {
				return interval * childIndex
			}

			// If the animation with the min interval will exceed the max duration,
			// cut the interval length to fit
			let animationWillExceedMaxDuration = childCount * minInterval > maxDuration

			if (animationWillExceedMaxDuration) {
				interval = maxDuration / childCount
			}

			return interval * childIndex
		},
		[freezeAfterInitial, minInterval, maxDuration, childCount]
	)

	return React.Children.map(children, (child, index) =>
		React.cloneElement(child, {
			style: { transitionDelay: `${getAnimationDelay(index)}s` }
		})
	)
}

StaggeredAnimation.propTypes = {
	minInterval: PropTypes.number,
	maxDuration: PropTypes.number,
	freezeAfterInitial: PropTypes.bool.isRequired
}

StaggeredAnimation.defaultProps = {
	minInterval: 0.2,
	maxDuration: 0,
	freezeAfterInitial: true
}

export default StaggeredAnimation
