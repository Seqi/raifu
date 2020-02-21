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
		},	
	},
	typography: {
		fontFamily: ['Alata', 'sans-serif'].join(','),
		h2: {
			fontSize: '4rem',
		},
		h5: {
			fontSize: '1.4rem'
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1600,
		}
	},
	overrides: {
		MuiCardHeader: {
			root: {
				'@media (max-width: 767px)': {
					paddingLeft: '16px',
					paddingRight: '16px'
				},
			},
			content: {
				borderBottom: '2px solid #CA054D',
				paddingBottom: '5px',
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
			}
		},
		MuiSpeedDial: {
			root: {
				position: 'fixed',
				bottom: '2%',
				right: '3%',
			}
		}
	}
})
