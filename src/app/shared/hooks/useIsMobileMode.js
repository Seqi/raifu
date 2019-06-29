import { useState, useEffect } from 'react'

export default function useIsMobileMode(mobileModeWidth = 768, onMobileModeChange) {	
	let [isMobileMode, setIsMobileMode] = useState(window.innerWidth <= mobileModeWidth)

	useEffect(() => {
		let onResize = () => {
			let isMobileModeSize = window.innerWidth <= mobileModeWidth
			setIsMobileMode(isMobileModeSize)
		}

		window.addEventListener('resize', onResize)

		return () => window.removeEventListener('resize', onResize)
	}, [])

	useEffect(() => {
		if (onMobileModeChange) {
			onMobileModeChange(isMobileMode)
		}
	}, [isMobileMode])

	return isMobileMode
}