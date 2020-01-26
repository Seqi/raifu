import React from 'react'

import Loading from './Loading'

let LoadingOverlay = () => {
	return (		
		<div style={ { position: 'initial' } }>
			<div style={ { 
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)'
			} }>
				<Loading />
			</div>
		</div>
	)
}

export default LoadingOverlay