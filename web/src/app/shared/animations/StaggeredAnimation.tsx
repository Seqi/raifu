import React, { useCallback, useRef, useEffect, FC } from 'react'
import PropTypes from 'prop-types'

type StaggeredAnimationProps = {
	interval?: number
	maxDuration?: number
	freezeAfterInitial?: boolean
}

const StaggeredAnimation: FC<StaggeredAnimationProps> = ({
	interval: minInterval,
	maxDuration,
	freezeAfterInitial,
	children,
}) => {
	const childCount = React.Children.count(children)

	const hasRendered = useRef<boolean>(false)
	useEffect(() => {
		hasRendered.current = true
	}, [])

	const getAnimationDelay = useCallback(
		(childIndex: number) => {
			// If requested, once the initial animation has played out, we don't want to stagger anymore
			if (freezeAfterInitial && hasRendered.current) {
				return 0
			}

			let interval = minInterval || 200

			// If no max duration is specified, we can simply stagger without worrying
			if (!maxDuration) {
				return interval * childIndex
			}

			// If the animation with the min interval will exceed the max duration,
			// cut the interval length to fit
			const animationWillExceedMaxDuration = childCount * interval > maxDuration

			if (animationWillExceedMaxDuration) {
				interval = maxDuration / childCount
			}

			return interval * childIndex
		},
		[freezeAfterInitial, minInterval, maxDuration, childCount]
	)

	return (
		<>
			{React.Children.map(children, (child, index) => {
				if (!React.isValidElement(child)) {
					return child
				}

				return React.cloneElement(child, {
					style: { transitionDelay: `${getAnimationDelay(index)}ms` },
				})
			})}
		</>
	)
}

StaggeredAnimation.propTypes = {
	interval: PropTypes.number,
	maxDuration: PropTypes.number,
	freezeAfterInitial: PropTypes.bool,
}

StaggeredAnimation.defaultProps = {
	interval: 200,
	maxDuration: 0,
	freezeAfterInitial: true,
}

export default StaggeredAnimation
