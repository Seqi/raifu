import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core'

import ReactiveTitle from 'app/shared/components/text/ReactiveTitle'

function CalendarToolbar({label, view, onNavigate, onView, theme}) {
	const blankButton = {
		backgroundColor: 'inherit',
		cursor: 'pointer',
		border: 0,
		color: theme.palette.text.primary,
		fontSize: '1.3rem'
	}

	const activeButton = {		
		color: theme.palette.primary.main,
	}

	return (
		<div style={ {display: 'flex', marginBottom: '16px'} }>
			<ReactiveTitle>
				{ label }
			</ReactiveTitle>

			<div style={ {display: 'flex', flex: '1', marginLeft: '12px', fontSize: '1.5rem'} }>
				<button type='button' style={ {...blankButton, marginRight: '8px' } } onClick={ _ => onNavigate('PREV') } >
					<i className='fa fa-chevron-left' />
				</button>
				
				<button type='button' style={ blankButton } onClick={ _ => onNavigate('NEXT') } >
					<i className='fa fa-chevron-right' />
				</button>
			</div>

			<button
				title='Event View'
				type='button'
				onClick={ () => onView('month') }
				style={ { 
					...blankButton, 
					marginLeft: '8px', 
					...(view === 'month' ? activeButton : {})
				} }
			>
				<i className='far fa-calendar' />
			</button>

			<button 
				title='Schedule View' 
				type='button' 			
				onClick={ () => onView('agenda') }
				style={ { 
					...blankButton, 
					marginLeft: '8px', 
					...(view === 'agenda' ? activeButton : {})
				} }
			>
				<i className='far fa-clipboard' />
			</button>
		</div>
	)
}

CalendarToolbar.propTypes = {
	view: PropTypes.string.isRequired,
	onView: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired
}

export default withTheme(CalendarToolbar)