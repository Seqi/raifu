import React, { useState, useCallback } from 'react'
import { useCookies } from 'react-cookie'

import { Slide, Box, styled } from '@material-ui/core'

import AnnouncementBannerItem from './AnnouncementBannerItem'
import announcementList from './announcements'

const cookieName = 'announcement-last-seen'
const cookieOptions = {	path: '/' }

let AnnouncementBannerContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	position: 'fixed',
	bottom: 0,
	zIndex: 100,
		
	textAlign: 'center',
	padding: theme.spacing(1),
	backgroundColor: theme.palette.primary.main,
}))

let AnnouncementBanner = () => {	
	let [ cookies, setCookie ] = useCookies()
	let [ announcements, setAnnouncements ] = useState(() => {
		let lastSeenAnnouncementId = cookies[cookieName]
		return announcementList
			.filter(announcement => !lastSeenAnnouncementId || announcement.id > lastSeenAnnouncementId)
			.reverse()
			.slice(0, 1)
	})

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
		<Slide direction='up' in={ true }>
			<AnnouncementBannerContainer>
				{ announcements.map((announcement, i) => 
					<AnnouncementBannerItem key={ i } onClose={ onBannerClose } announcement={ announcement } />)
				}			
			</AnnouncementBannerContainer>
		</Slide>
	)
}

export default AnnouncementBanner