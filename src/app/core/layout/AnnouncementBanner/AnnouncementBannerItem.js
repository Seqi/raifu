import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/styles'

const AnnouncementBannerItem = ({ theme, announcement, onClose }) => {
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

	let closeCallback = useCallback(() => onClose(announcement), [ announcement, onClose ])

	return (
		<div style={ styles.banner }>
			<span style={ styles.text }>{ announcement.display } </span>
			<button type='button' className='avatar-button' style={ styles.button } onClick={ closeCallback }>
				<i className='fa fa-times' />
			</button>
		</div>
	)
}

AnnouncementBannerItem.propTypes = {
	announcement: PropTypes.shape({
		id: PropTypes.number.isRequired,
		display: PropTypes.node.isRequired,
	}).isRequired,
	onClose: PropTypes.func,
}

AnnouncementBannerItem.defaultProps = {
	onClose: () => { }
}

export default withTheme(AnnouncementBannerItem)