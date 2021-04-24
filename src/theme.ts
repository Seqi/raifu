import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'

// Necessary for fixing the types to include lab stuff
// It should be 'import type '@material-ui...' but not working for some reason
import type {} from '@material-ui/lab/themeAugmentation'

export default createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#CA054D',
		},
		background: {
			default: '#282b35',
			paper: '#3B3E47',
		},
		text: {
			primary: '#eee',
			secondary: '#ddd',
		},
	},
	typography: {
		fontFamily: ['Alata', 'sans-serif'].join(','),
		subtitle1: {
			fontSize: '20px',
			lineHeight: '1.55',
		},
		h2: {
			fontSize: '4rem',
			lineHeight: '1',
		},
		h3: {
			fontSize: '3.25rem',
			lineHeight: '1.2',
		},
		h5: {
			fontSize: '1.4rem',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1600,
		},
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
			},
		},
		MuiChip: {
			root: {
				textTransform: 'uppercase',
			},
		},
	},
})
