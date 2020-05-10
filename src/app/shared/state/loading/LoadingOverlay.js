import React from 'react'

import Loading from './Loading'
import AppOverlay from 'app/shared/utils/AppOverlay'

let LoadingOverlay = () => {
	return (
		<AppOverlay>
			<Loading />
		</AppOverlay>
	)
}

export default LoadingOverlay
