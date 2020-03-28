import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'

import { Dialog, DialogContent, DialogActions, Button, Box, styled } from '@material-ui/core'

let ChangeLogItemContainer = styled(Box)(({ theme }) => ({
	'& h1': {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
	},
}))

const ViewChangeLogDialog = ({ isOpen, onClose }) => {
	let [response, setResponse] = useState({ releases: null, error: false })

	useEffect(() => {
		fetch('https://api.github.com/repos/seqi/raifu/releases')
			.then(res => res.json())
			.then(data => setResponse({ releases: data, error: false }))
			.catch(_ => setResponse({ releases: null, error: true }))
	}, [])

	return (
		<Dialog maxWidth='md' open={ isOpen }>
			<DialogContent>
				{ response.releases ? 
					response.releases.map((release) => (
						<ChangeLogItemContainer 
							key={ release.id } 
							angerouslySetInnerHTML={ { __html: marked(release.body) } } 
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
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default ViewChangeLogDialog