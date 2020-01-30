import React from 'react'

import LogoImage from 'assets/home/logo.png'
import useIsMobileMode from 'app/shared/hooks/useIsMobileMode'

let Logo = () => {
	let isMobileMode = useIsMobileMode()

	return (
		<div
			style={ {
				maxWidth: '750px',
				width: '95%',
				margin: '0 auto',
				paddingTop: isMobileMode ? '24px' : '0px',
				paddingBottom: '24px',
			} }
		>
			<img style={ { width: '100%' } } src={ LogoImage } alt='Raifu Airsoft Loadout Management' />
		</div>
	)
}

export default Logo
