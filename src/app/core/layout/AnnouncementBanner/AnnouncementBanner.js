import React from 'react'
import { withTheme } from '@material-ui/styles'

let AnnouncementBanner = ({ theme }) => {
	const style = {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		zIndex: 100,

		display: 'flex',
		alignItems: 'center',
		
		textAlign: 'center',
		padding: '0.3rem',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary
	}

	const textStyle = {
		flex: 1
	}

	const closeButtonStyle = {
		flex: 0,
		float: 'right',
		marginRight: '0.5rem',
		color: theme.palette.text.primary,
		fontSize: '1rem'
	}

	return (
		<div style={ style }>
			<span style={ textStyle }>Here is an announcement!</span>
			<button type='button' className='avatar-button' style={ closeButtonStyle }>
				<i className='fa fa-times' />
			</button>
		</div>
	)
}

export default withTheme(AnnouncementBanner)