import { useState, useEffect } from 'react'

let isPageAtBottom = () => {
	return window.scrollY + window.innerHeight >= document.body.offsetHeight
}

function useIsPageAtBottom() {
	let [isAtBottom, setIsAtBottom] = useState(false)

	useEffect(() => {
		let listener = () => {
			let currentlyAtBottom = isPageAtBottom()

			if (isAtBottom !== currentlyAtBottom) {
				setIsAtBottom(currentlyAtBottom)
			}
		}

		window.addEventListener('scroll', listener)

		return () => {
			window.removeEventListener('scroll', listener)
		}
	}, [isAtBottom])

	return isAtBottom
}

export default useIsPageAtBottom