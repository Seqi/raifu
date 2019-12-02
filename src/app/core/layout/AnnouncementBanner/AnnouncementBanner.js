import React from 'react'
import { withTheme } from '@material-ui/styles'
import AnnouncementBannerItem from './AnnouncementBannerItem'

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

	return (
		<div style={ containerStyle }>
			<AnnouncementBannerItem />
		</div>
	)
}

export default withTheme(AnnouncementBanner)