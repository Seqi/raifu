import { useState, useEffect } from 'react'

const isPageAtBottom = (): boolean => {
	return window.scrollY + window.innerHeight >= document.body.offsetHeight
}

const useIsPageAtBottom = (): boolean => {
	const [isAtBottom, setIsAtBottom] = useState<boolean>(false)

	useEffect(() => {
		const listener = () => {
			const currentlyAtBottom = isPageAtBottom()

			if (isAtBottom !== currentlyAtBottom) {
				setIsAtBottom(currentlyAtBottom)
			}
		}

		window.addEventListener('scroll', listener)

		return () => window.removeEventListener('scroll', listener)
	}, [isAtBottom])

	return isAtBottom
}

export default useIsPageAtBottom
