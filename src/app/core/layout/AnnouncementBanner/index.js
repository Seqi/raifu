import React from 'react'
import { CookiesProvider } from 'react-cookie'

import AnnouncementBanner from './AnnouncementBanner'

const Banner = () => (
	<CookiesProvider>
		<AnnouncementBanner />
	</CookiesProvider>
)

export default Banner