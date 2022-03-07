import { FC, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Box,
	styled,
} from '@material-ui/core'

import useAnalytics from 'app/shared/hooks/useAnalytics'
import { Error } from 'app/shared/state'
import { ChangeLog, format } from './ChangeLog'

const ChangeLogItemContainer = styled(Box)(({ theme }) => ({
	lineHeight: 2,
	marginBottom: theme.spacing(4),
	'& ul': {
		listStyle: 'circle',
	},
	'& h1': {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
	},

	'& .new-alert::after': {
		content: '"*New! "',
		fontSize: '1rem',
		fontWeight: 500,
		paddingLeft: theme.spacing(0.5),
	},

	'& p, li': {
		fontSize: '1rem',
	},

	[theme.breakpoints.down('xs')]: {
		lineHeight: 1.35,

		'& h1': {
			fontSize: '1.5rem',
		},
		'& h2': {
			fontSize: '1rem',
		},
		'& p, li': {
			fontSize: '0.9rem',
			padding: theme.spacing(0.5, 0),
		},
	},
}))

const releaseCookieName = 'release-last-seen'
const cookieOptions = { path: '/', maxAge: 60 * 60 * 24 * 365 * 5 }

type ViewChangeLogDialogProps = {
	onHasUpdates: (hasUpdates: boolean) => any
	isOpen: boolean
	onClose: () => void
}

const ViewChangeLogDialog: FC<ViewChangeLogDialogProps> = ({
	onHasUpdates,
	isOpen,
	onClose,
}) => {
	const [response, setResponse] = useState<{
		changelogs: ChangeLog[] | null
		error: boolean
	}>({
		changelogs: null,
		error: false,
	})
	const [newChangeLogs, setNewChangeLogs] = useState<ChangeLog[]>([])
	const [cookies, setCookie] = useCookies()
	const analytics = useAnalytics()

	// Send analytics on open
	useEffect(() => {
		isOpen && analytics.logEvent('change_log_opened')
	}, [analytics, isOpen])

	// Fetch change logs
	useEffect(() => {
		fetch('https://api.github.com/repos/seqi/raifu/releases')
			.then((res) => res.json())
			.then((data: ChangeLog[]) => setResponse({ changelogs: data, error: false }))
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
		isOpen && onHasUpdates(false)
	}, [isOpen, onHasUpdates])

	// Set cookie value to latest update on open
	useEffect(() => {
		if (isOpen && newChangeLogs.length > 0) {
			setCookie(releaseCookieName, newChangeLogs[0].id, cookieOptions)
		}
	}, [isOpen, newChangeLogs, setCookie])

	return (
		<Dialog maxWidth='md' open={ isOpen } onClose={ onClose }>
			<DialogContent>
				{response.error ? (
					<Error error='Could not load change logs. Please try again later.' />
				) : response.changelogs ? (
					response.changelogs.map((changelog) => (
						<ChangeLogItemContainer
							key={ changelog.id }
							dangerouslySetInnerHTML={ { __html: format(changelog, newChangeLogs) } }
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
	onClose: PropTypes.func.isRequired,
}

export default ViewChangeLogDialog
