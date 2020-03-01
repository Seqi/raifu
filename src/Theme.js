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
				textTransform: 'uppercase',
			},
		},
		MuiSpeedDial: {
			root: {
				position: 'fixed',
				bottom: '2%',
				right: '3%',
			}
		},
		MuiChip: {
			root: {
				textTransform: 'uppercase'
			}
		}
	}
})
