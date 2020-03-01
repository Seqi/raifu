import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Box, styled, ButtonBase } from '@material-ui/core'

let AnnouncementBannerItemContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
})

let AnnouncementBannerDeleteButton = styled(ButtonBase)(({ theme }) => ({
	position: 'absolute',
	right: 0,
	fontSize: '1.1rem',
	marginRight: theme.spacing(1)
}))

const AnnouncementBannerItem = ({ announcement, onClose }) => {
	let closeCallback = useCallback(() => onClose(announcement), [ announcement, onClose ])

	return (
		<AnnouncementBannerItemContainer>
			<Box width='100%'>
				{ announcement.display }
			</Box>
			
			<AnnouncementBannerDeleteButton onClick={ closeCallback }>
				<i className='fa fa-times' />
			</AnnouncementBannerDeleteButton>
		</AnnouncementBannerItemContainer>
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

export default AnnouncementBannerItem