import React, { useState, useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { withTheme } from '@material-ui/styles'

import AnnouncementBannerItem from './AnnouncementBannerItem'
import announcements from './announcements'

const getAnnouncements = (seen) => {
	if (!seen) {
		return announcements
	}

	// Only take 2, don't wanna spam
	return announcements
		.filter(announcement => !seen.ids.find(id => id === announcement.id))
		.sort((a, b) => a.id > b.id ? -1 : 1)
		.slice(0, 2)
}

const cookieName = 'announcement-last-seen'

let AnnouncementBanner = ({ theme }) => {
	const containerStyle = {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		zIndex: 100,
		
		textAlign: 'center',
		padding: '0.3rem',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary
	}
	
	let [ cookies, setCookie ] = useCookies()
	let [ announcements, setAnnouncements ] = useState(getAnnouncements(cookies[cookieName]))

	let onBannerClose = useCallback((bannerItem) => {
		// Remove the banner
		setAnnouncements(announcements.filter(a => a.id !== bannerItem.id))

		// Update the cookies
		let cookie = cookies[cookieName]

		if (cookie) {
			setCookie(cookieName, { ids: [ ...cookie.ids, bannerItem.id]})
		} else {
			setCookie(cookieName, { ids: [ bannerItem.id ] })
		}
	}, [announcements, cookies, setCookie])

	if (announcements.length === 0) {
		return null
	}

	return (
		<div style={ containerStyle }>
			{ announcements.map((announcement, i) => <AnnouncementBannerItem key={ i } onClose={ onBannerClose } announcement={ announcement } />)}			
		</div>
	)
}

export default withTheme(AnnouncementBanner)