import { FC } from 'react'

import Loading from './Loading'
import AppOverlay from 'app/shared/utils/AppOverlay'

const LoadingOverlay: FC = () => {
	return (
		<AppOverlay>
			<Loading />
		</AppOverlay>
	)
}

export default LoadingOverlay
