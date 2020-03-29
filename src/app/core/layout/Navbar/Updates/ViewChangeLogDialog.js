import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import PropTypes from 'prop-types'
import marked from 'marked'

import { Dialog, DialogContent, DialogActions, Button, Box, styled } from '@material-ui/core'

let ChangeLogItemContainer = styled(Box)(({ theme }) => ({
	'& h1': {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
	},

	'& .new-alert::after': {
		content: '"*New! "',
		fontSize: '1rem',
		fontWeight: 500,
		paddingLeft: theme.spacing(0.5)
	},

	'& p, li': {
		fontSize: '1rem'
	}
}))

const releaseCookieName = 'release-last-seen'
const cookieOptions = {	path: '/', maxAge: 60 * 60 * 24 * 365 * 5 }

const ViewChangeLogDialog = ({ onHasUpdates, isOpen, onClose }) => {
	let [response, setResponse] = useState({ releases: null, error: false })
	let [newChangeLogs, setNewChangeLogs] = useState([])
	let [formattedChangeLogs, setFormattedChangeLogs] = useState([])
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

			let newChangeLogs = response.releases.filter(release => !lastSeenReleaseId || release.id > lastSeenReleaseId)

			if (newChangeLogs.length > 0) {
				setNewChangeLogs(newChangeLogs)
				onHasUpdates(true)
			}
		}
	}, [cookies, onHasUpdates, response.releases])

	// Apply the new-alert class to any updates and generate the markdown 
	useEffect(() => {
		if (response.releases) {
			let formattedChangeLogs = response.releases.map(update => {
				// Convert markdown to html
				let updateHtml = marked(update.body)

				// Add new-alert class to the first <h1> tag if this change log is new
				if (newChangeLogs.find(log => log.id === update.id)) {
					updateHtml = updateHtml.replace( /(h1 id=".+?")/, '$1 class="new-alert"')
				}

				// find the first <h1> tag and add the 'new-alert' class
				return {
					...update,
					body: updateHtml
				}
				
			})

			setFormattedChangeLogs(formattedChangeLogs)
		}
	}, [newChangeLogs, response.releases])

	// When opened, update the cookie and clear notifications
	useEffect(() => {
		if (isOpen && newChangeLogs.length > 0) {
			onHasUpdates(false)
			setCookie(releaseCookieName, newChangeLogs[0].id, cookieOptions)
		}
	}, [isOpen, newChangeLogs, onHasUpdates, setCookie])

	return (
		<Dialog maxWidth='md' open={ isOpen } onBackdropClick={ onClose }>
			<DialogContent>
				{ formattedChangeLogs ? 
					formattedChangeLogs.map((release) => (
						<ChangeLogItemContainer 
							key={ release.id } 
							dangerouslySetInnerHTML={ { __html: release.body } } 
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