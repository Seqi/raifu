import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import PropTypes from 'prop-types'
import marked from 'marked'

import { Dialog, DialogContent, DialogActions, Button, Box, styled } from '@material-ui/core'

import useAnalytics from 'app/shared/hooks/useAnalytics'
import { Error } from 'app/shared/state'

let ChangeLogItemContainer = styled(Box)(({ theme }) => ({
	lineHeight: 2,
	'& h1': {
		borderBottom: `1px solid ${theme.palette.primary.main}`
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
const cookieOptions = { path: '/', maxAge: 60 * 60 * 24 * 365 * 5 }

const ViewChangeLogDialog = ({ onHasUpdates, isOpen, onClose }) => {
	let [response, setResponse] = useState({ changelogs: null, error: false })
	let [newChangeLogs, setNewChangeLogs] = useState([])
	let [cookies, setCookie] = useCookies()
	let analytics = useAnalytics()

	// Send analytics on open
	useEffect(() => {
		isOpen && analytics.logEvent('change_log_opened')
	}, [analytics, isOpen])

	// Fetch change logs
	useEffect(() => {
		fetch('https://api.github.com/repos/seqi/raifu/releases')
			.then((res) => res.json())
			.then((data) => setResponse({ changelogs: data, error: false }))
			.catch((_) => setResponse({ changelogs: null, error: true }))
	}, [])

	// Calculate which releases are new
	useEffect(() => {
		if (response.changelogs) {
			let lastSeenReleaseId = cookies[releaseCookieName]

			let newChangeLogs = response.changelogs.filter(
				(release) => !lastSeenReleaseId || release.id > lastSeenReleaseId
			)

			if (newChangeLogs.length > 0) {
				setNewChangeLogs(newChangeLogs)
			}
		}
	}, [cookies, response.changelogs])

	// Notify of updates if there are any
	useEffect(() => {
		newChangeLogs.length > 0 && onHasUpdates(true)
	}, [newChangeLogs, onHasUpdates])

	// Clear updates on open
	useEffect(() => {
		isOpen && newChangeLogs.length > 0 && onHasUpdates(false)
	}, [isOpen, newChangeLogs, onHasUpdates])

	// Set cookie value to latest update on open
	useEffect(() => {
		if (isOpen && newChangeLogs.length > 0) {
			setCookie(releaseCookieName, newChangeLogs[0].id, cookieOptions)
		}
	}, [isOpen, newChangeLogs, setCookie])

	let formatChangelog = (changelog) => {
		let isNewChangelog = !!newChangeLogs.find((newLog) => newLog.id === changelog.id)

		let html = marked(changelog.body)

		if (isNewChangelog) {
			// Add new-alert class to the first <h1> tag if this change log is new
			return html.replace(/(h1 id=".+?")/, '$1 class="new-alert"')
		} else {
			return html
		}
	}

	return (
		<Dialog maxWidth='md' open={ isOpen } onBackdropClick={ onClose }>
			<DialogContent>
				{response.error ? (
					<Error error='Could not load change logs. Please try again later.' />
				) : response.changelogs ? (
					response.changelogs.map((changelog) => (
						<ChangeLogItemContainer
							key={ changelog.id }
							dangerouslySetInnerHTML={ { __html: formatChangelog(changelog) } }
						/>
					))
				) : (
					<div>Loading...</div>
				)}
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
	onClose: PropTypes.func.isRequired
}

export default ViewChangeLogDialog
