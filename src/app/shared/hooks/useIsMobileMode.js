import { useState, useEffect } from 'react'

export default function useIsMobileMode(mobileModeWidth = 768) {	
	let [isMobileMode, setIsMobileMode] = useState(window.innerWidth <= mobileModeWidth)

	useEffect(() => {
		let media = window.matchMedia(`(max-width: ${mobileModeWidth}px)`)

		let listener = (mediaQuery) => setIsMobileMode(mediaQuery.matches)
		media.addListener(listener)

		return () => media.removeListener(listener)
	}, [mobileModeWidth])

	return isMobileMode
}