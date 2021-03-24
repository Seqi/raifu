import React, { useCallback, useRef, useEffect, FC } from 'react'
import PropTypes from 'prop-types'

type StaggeredAnimationProps = {
	minInterval?: number
	maxDuration?: number
	freezeAfterInitial?: boolean
}

const StaggeredAnimation: FC<StaggeredAnimationProps> = ({
	minInterval,
	maxDuration,
	freezeAfterInitial,
	children,
}) => {
	let childCount = React.Children.count(children)

	let hasRendered = useRef<boolean>(false)
	useEffect(() => {
		hasRendered.current = true
	}, [])

	let getAnimationDelay = useCallback(
		(childIndex: number) => {
			// If requested, once the initial animation has played out, we don't want to stagger anymore
			if (freezeAfterInitial && hasRendered.current) {
				return 0
			}

			let interval = minInterval || 0.2

			// If no max duration is specified, we can simply stagger without worrying
			if (!maxDuration) {
				return interval * childIndex
			}

			// If the animation with the min interval will exceed the max duration,
			// cut the interval length to fit
			let animationWillExceedMaxDuration = childCount * interval > maxDuration

			if (animationWillExceedMaxDuration) {
				interval = maxDuration / childCount
			}

			return interval * childIndex
		},
		[freezeAfterInitial, minInterval, maxDuration, childCount]
	)

	return (
		<>
			{' '}
			{React.Children.map(children, (child, index) => {
				if (!React.isValidElement(child)) {
					return child
				}

				return React.cloneElement(child, {
					style: { transitionDelay: `${getAnimationDelay(index)}s` },
				})
			})}
		</>
	)
}

StaggeredAnimation.propTypes = {
	minInterval: PropTypes.number,
	maxDuration: PropTypes.number,
	freezeAfterInitial: PropTypes.bool,
}

StaggeredAnimation.defaultProps = {
	minInterval: 0.2,
	maxDuration: 0,
	freezeAfterInitial: true,
}

export default StaggeredAnimation
