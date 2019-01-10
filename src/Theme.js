import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#CA054D'
		},
		background: {
			default: '#282b35',
			paper: '#3B3E47'
		}
	},
	typography: {
		useNextVariants: true,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'Roboto',
			'"Segoe UI"',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	overrides: {
		MuiCardHeader: {
			root: {
				paddingBottom: '0px',
				'@media (max-width: 767px)': {
					paddingLeft: '16px',
					paddingRight: '16px'
				}
			},
			title: {
				textTransform: 'uppercase',
				fontSize: '1.1rem',
				fontWeight: '700',
				'@media (max-width: 767px)': {
					fontSize: '0.8rem'
				}
			},
			subheader: {
				textTransform: 'uppercase',
				fontSize: '0.8rem',
				'@media (max-width: 767px)': {
					fontSize: '0.6rem'
				},				
				paddingTop: '-5px',
				paddingBottom: '5px',
				borderBottom: '2px solid #CA054D'
			}
		},
		MuiCardContent: {
			root: {
				wordBreak: 'break-all'
			}
		}
	}
})
