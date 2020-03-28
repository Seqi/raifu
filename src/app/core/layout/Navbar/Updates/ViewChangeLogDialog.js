import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import PropTypes from 'prop-types'
import marked from 'marked'

import { Dialog, DialogContent, DialogActions, Button, Box, styled } from '@material-ui/core'

let ChangeLogItemContainer = styled(Box)(({ theme }) => ({
	'& h1': {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
	},
}))

const releaseCookieName = 'release-last-seen'
const cookieOptions = {	path: '/', maxAge: 60 * 60 * 24 * 365 * 5 }

const ViewChangeLogDialog = ({ onHasUpdates, isOpen, onClose }) => {
	let [response, setResponse] = useState({ releases: null, error: false })
	let [cookies, setCookie] = useCookies()
	
	useEffect(() => {
		fetch('https://api.github.com/repos/seqi/raifu/releases')
			.then(res => res.json())
			.then(data => setResponse({ releases: data, error: false }))
			.catch(_ => setResponse({ releases: null, error: true }))
	}, [])

	// If there are new releases, notify the parent
	useEffect(() => {
		if (response.releases) {
			let latestReleaseId = response.releases[0].id
			let lastSeenReleaseId = cookies[releaseCookieName]

			if (!lastSeenReleaseId || latestReleaseId > lastSeenReleaseId) {
				onHasUpdates(true)
			}
		}
	}, [cookies, onHasUpdates, response.releases])

	// When opened, update the cookie
	useEffect(() => {
		if (isOpen && response.releases) {
			onHasUpdates(false)

			let latestReleaseId = response.releases[0].id
			let lastSeenReleaseId = cookies[releaseCookieName]

			if (!lastSeenReleaseId || latestReleaseId > lastSeenReleaseId) {
				setCookie(releaseCookieName, latestReleaseId, cookieOptions)
			}
		}
	}, [cookies, isOpen, onHasUpdates, response.releases, setCookie])

	return (
		<Dialog maxWidth='md' open={ isOpen } onBackdropClick={ onClose }>
			<DialogContent>
				{ response.releases ? 
					response.releases.map((release) => (
						<ChangeLogItemContainer 
							key={ release.id } 
							dangerouslySetInnerHTML={ { __html: marked(release.body) } } 
						/>
					)) :
					<div>Loading...</div>
				}
			</DialogContent>

			<DialogActions>
				<Button variant='contained' color='primary' onClick={ onClose }>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

ViewChangeLogDialog.propTypes = {
	onHasUpdates: PropTypes.func.isRequired,	
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default ViewChangeLogDialog