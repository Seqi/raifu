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
	let [updates, setUpdates] = useState([])
	let [cookies, setCookie] = useCookies()
	
	useEffect(() => {
		fetch('https://api.github.com/repos/seqi/raifu/releases')
			.then(res => res.json())
			.then(data => setResponse({ releases: data, error: false }))
			.catch(_ => setResponse({ releases: null, error: true }))
	}, [])

	// Calculate which releases are new
	useEffect(() => {
		if (response.releases) {
			let lastSeenReleaseId = cookies[releaseCookieName]

			let updates = response.releases.filter(release => !lastSeenReleaseId || release.id > lastSeenReleaseId)

			if (updates.length > 0) {
				setUpdates(updates)
				onHasUpdates(true)
			}
		}
	}, [cookies, onHasUpdates, response.releases])

	// When opened, update the cookie and clear notifications
	useEffect(() => {
		if (isOpen && updates.length > 0) {
			onHasUpdates(false)
			setCookie(releaseCookieName, updates[0].id, cookieOptions)
		}
	}, [isOpen, onHasUpdates, setCookie, updates])

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