import React from 'react'

let AppOverlay = ({ children }) => {
	return (
		<div style={ { position: 'initial' } }>
			<div
				style={ {
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100vh',
					width: '100vw',
					zIndex: '-1'
				} }
			>
				<div
					style={ {
						width: '100%',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)'
					} }
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export default AppOverlay
