import React from 'react'
import { withTheme } from '@material-ui/styles'

const AnnouncementBannerItem = ({ theme }) => {
	const styles = {
		banner: {
			display: 'flex',
			alignItems: 'center',
		},
		text: {
			flex: 1
		},
		button: {
			flex: 0,
			float: 'right',
			marginRight: '0.5rem',
			color: theme.palette.text.primary,
			fontSize: '1.2rem'
		}
	}

	return (
		<div style={ styles.banner }>
			<span style={ styles.text }>Here is an announcement!</span>
			<button type='button' className='avatar-button' style={ styles.button }>
				<i className='fa fa-times' />
			</button>
		</div>
	)
}

export default withTheme(AnnouncementBannerItem)