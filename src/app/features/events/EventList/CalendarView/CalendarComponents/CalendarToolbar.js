import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'

function CalendarToolbar({ label, onNavigate }) {
	const theme = useTheme()

	const blankButton = {
		backgroundColor: 'inherit',
		cursor: 'pointer',
		border: 0,
		color: theme.palette.text.primary,
		fontSize: '1.3rem',
	}

	return (
		<div style={ { display: 'flex', marginBottom: '16px' } }>
			<ReactiveTitle>{label}</ReactiveTitle>

			<div style={ { display: 'flex', flex: '1', marginLeft: '12px', fontSize: '1.5rem' } }>
				<button
					type='button'
					style={ { ...blankButton, marginRight: '8px' } }
					onClick={ (_) => onNavigate('PREV') }
				>
					<i className='fa fa-chevron-left' />
				</button>

				<button type='button' style={ blankButton } onClick={ (_) => onNavigate('NEXT') }>
					<i className='fa fa-chevron-right' />
				</button>
			</div>
		</div>
	)
}

CalendarToolbar.propTypes = {
	view: PropTypes.string.isRequired,
	onView: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired,
}

export default CalendarToolbar
