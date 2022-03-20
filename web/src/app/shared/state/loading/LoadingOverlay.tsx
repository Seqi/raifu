import { FC } from 'react'

import AppOverlay from 'app/shared/utils/AppOverlay'

import Loading from './Loading'

const LoadingOverlay: FC = () => {
	return (
		<AppOverlay>
			<Loading />
		</AppOverlay>
	)
}

export default LoadingOverlay
