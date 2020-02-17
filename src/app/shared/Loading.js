import React, { useEffect, useState } from 'react'

import './Loading.css'

const REASSURANCE_TIME = 3000
const REASSURANCE_MESSAGE = 'Hold tight! This won\'t take a second.'

export default function Loading() {
	let [showReassurance, setShowReassurance] = useState(false)

	useEffect(() => {
		let timeout = setTimeout(() => setShowReassurance(true), REASSURANCE_TIME)

		return () => clearTimeout(timeout)			
	}, [])

	return (
		<div>
			<div className='lds-dual-ring' />

			{ showReassurance && (
				<div className='reassurance-text fade-in'>
					{ REASSURANCE_MESSAGE }
				</div>
			)}
		</div>
	)
}
