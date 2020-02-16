import React, { useState, useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { withTheme } from '@material-ui/styles'

import AnnouncementBannerItem from './AnnouncementBannerItem'
import announcements from './announcements'

import './AnnouncementBanner.css'

const getAnnouncements = (lastSeenId) => {
	// Only take 2, don't wanna spam
	return announcements
		.filter(announcement => lastSeenId ? announcement.id > lastSeenId : true)
		.reverse()
		.slice(0, 1)
}

const cookieName = 'announcement-last-seen'
const cookieOptions = {
	path: '/'
}

let AnnouncementBanner = ({ theme }) => {
	const containerStyle = {
		width: '100%',
		position: 'fixed',
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

		// Set the cookie
		let bannerLastSeenId = cookies[cookieName]
		if (!bannerLastSeenId || bannerLastSeenId < bannerItem.id) {
			setCookie(cookieName, bannerItem.id, cookieOptions)
		}
	}, [announcements, cookies, setCookie])

	if (announcements.length === 0) {
		return null
	}

	return (
		<div className='slide-up' style={ containerStyle }>
			{ 
				announcements.map((announcement, i) => 
					<AnnouncementBannerItem key={ i } onClose={ onBannerClose } announcement={ announcement } />)
			}			
		</div>
	)
}

export default withTheme(AnnouncementBanner)