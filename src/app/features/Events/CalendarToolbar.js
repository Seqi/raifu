import React from 'react'
import PropTypes from 'prop-types'
import { withTheme, Typography } from '@material-ui/core'

function CalendarToolbar({label, onNavigate, theme}) {
	const blankButton = {
		backgroundColor: 'inherit',
		cursor: 'pointer',
		border: 0,
		color: theme.palette.text.primary,
		fontSize: '1.3rem'
	}

	return (
		<div style={ {display: 'flex', marginBottom: '16px'} }>
			<Typography variant={ 'h3' }>
				{ label }
			</Typography>

			<div style={ {display: 'flex', marginLeft: '12px', fontSize: '1.5rem'} }>
				<button 
					type='button' 
					style={ {...blankButton, marginRight: '8px' } } 
					className='fa fa-chevron-left' 
					onClick={ _ => onNavigate('PREV') } 
				/>
				
				<button 
					type='button' 
					style={ blankButton } 
					className='fa fa-chevron-right' 
					onClick={ _ => onNavigate('NEXT') } 
				/>
			</div>
		</div>
	)
}

CalendarToolbar.propTypes = {
	label: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired
}

export default withTheme()(CalendarToolbar)