import React, { useEffect, useState } from 'react'

import { useTheme } from '@material-ui/core'

import './Loading.css'

const REASSURANCE_TIME = 3000
const REASSURANCE_MESSAGE = 'Hold tight! This won\'t take a second.'

export default function Loading() {
	let [showReassurance, setShowReassurance] = useState(false)
	let theme = useTheme()

	useEffect(() => {
		let timeout = setTimeout(() => setShowReassurance(true), REASSURANCE_TIME)

		return () => clearTimeout(timeout)			
	}, [])

	return (
		<div style={ {textAlign: 'center'} }>
			<i 
				style={ { color: theme.palette.background.paper } } 
				className='fa fa-crosshairs load-icon'
			/>

			{ showReassurance && (
				<div className='fade-in'>
					{ REASSURANCE_MESSAGE }
				</div>
			)}
		</div>
	)
}
